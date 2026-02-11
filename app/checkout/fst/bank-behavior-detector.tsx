import { useState, useEffect } from 'react';
import { Clock, ExternalLink, Shield } from 'lucide-react';

interface BankBehaviorDetectorProps {
  onBankVisitDetected: (confidence: number) => void;
}

export function BankBehaviorDetector({ onBankVisitDetected }: BankBehaviorDetectorProps) {
  const [userBehavior, setUserBehavior] = useState({
    hasLeftPage: false,
    awayTime: 0,
    leaveCount: 0,
    confidence: 0
  });

  const [isAway, setIsAway] = useState(false);
  const [awayStartTime, setAwayStartTime] = useState<number | null>(null);

  useEffect(() => {
    let awayInterval: NodeJS.Timeout;

    const startAwayTimer = () => {
      if (!isAway) {
        setIsAway(true);
        setAwayStartTime(Date.now());
        
        awayInterval = setInterval(() => {
          const currentAwayTime = Date.now() - (awayStartTime || Date.now());
          setUserBehavior(prev => ({ ...prev, awayTime: currentAwayTime }));
        }, 1000);
      }
    };

    const stopAwayTimer = () => {
      if (isAway && awayStartTime) {
        const totalAwayTime = Date.now() - awayStartTime;
        setIsAway(false);
        
        if (awayInterval) {
          clearInterval(awayInterval);
        }

        // Analyser le comportement
        const confidence = calculateBankVisitConfidence(totalAwayTime);
        
        setUserBehavior(prev => ({
          ...prev,
          hasLeftPage: true,
          awayTime: totalAwayTime,
          leaveCount: prev.leaveCount + 1,
          confidence
        }));

        onBankVisitDetected(confidence);
      }
    };

    // Événements de navigation
    window.addEventListener('blur', startAwayTimer);
    window.addEventListener('focus', stopAwayTimer);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        startAwayTimer();
      } else {
        stopAwayTimer();
      }
    });

    return () => {
      window.removeEventListener('blur', startAwayTimer);
      window.removeEventListener('focus', stopAwayTimer);
      document.removeEventListener('visibilitychange', stopAwayTimer);
      if (awayInterval) clearInterval(awayInterval);
    };
  }, [isAway, awayStartTime, onBankVisitDetected]);

  const calculateBankVisitConfidence = (awayTime: number): number => {
    // Logique de confiance basée sur le temps d'absence
    if (awayTime < 10000) return 0; // Moins de 10s = pas la banque
    if (awayTime < 30000) return 25; // 10-30s = peut-être
    if (awayTime < 120000) return 60; // 30s-2min = probablement
    if (awayTime < 300000) return 85; // 2-5min = très probablement
    return 95; // Plus de 5min = certainement
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${seconds}s`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-emerald-600';
    if (confidence >= 50) return 'text-amber-600';
    return 'text-gray-400';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 80) return 'Probablement à la banque';
    if (confidence >= 50) return 'Peut-être à la banque';
    return 'Analyse en cours...';
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          {isAway ? (
            <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
          ) : (
            <Shield className="w-4 h-4 text-blue-600" />
          )}
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Détection comportementale
          </h4>
          
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-blue-700">État actuel:</span>
              <span className={getConfidenceColor(userBehavior.confidence)}>
                {isAway ? 'Absent' : getConfidenceText(userBehavior.confidence)}
              </span>
            </div>
            
            {userBehavior.hasLeftPage && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Temps d'absence:</span>
                  <span className="text-blue-900 font-medium">
                    {formatTime(userBehavior.awayTime)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Confiance:</span>
                  <span className={`font-medium ${getConfidenceColor(userBehavior.confidence)}`}>
                    {userBehavior.confidence}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Nombre de sorties:</span>
                  <span className="text-blue-900 font-medium">
                    {userBehavior.leaveCount}
                  </span>
                </div>
              </>
            )}
          </div>
          
          {userBehavior.confidence >= 80 && (
            <div className="mt-3 p-2 bg-emerald-100 rounded border border-emerald-200">
              <p className="text-xs text-emerald-800 flex items-center gap-2">
                <ExternalLink size={12} />
                Nous avons détecté que vous êtes probablement allé à votre banque.
                Vous pouvez maintenant déclarer votre paiement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
