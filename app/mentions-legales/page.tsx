import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MentionsLegales() {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold text-textDark mb-8">
          Informazioni Legali
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              1. Editore del sito
            </h2>
            <div className="space-y-2">
              <p><strong>Flocon</strong></p>
              <p>Società per azioni semplificata (SAS) con capitale di 10 000€</p>
              <p>RCS Paris : 123 456 789</p>
              <p>SIRET : 123 456 789 00012</p>
              <p>Sede legale: 123 Rue de la Mode, 75001 Parigi, Francia</p>
              <p>Telefono : +33 (0)1 23 45 67 89</p>
              <p>Email : contact@flocon.fr</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              2. Direttore della pubblicazione
            </h2>
            <div className="space-y-2">
              <p><strong>Jean Dupont</strong></p>
              <p>Presidente-Direttore Generale</p>
              <p>Email : jean.dupont@flocon.fr</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              3. Host del sito
            </h2>
            <div className="space-y-2">
              <p><strong>Vercel Inc.</strong></p>
              <p>340 S Lemon Ave #4133</p>
              <p>Walnut, CA 91789</p>
              <p>États-Unis</p>
              <p>Téléphone : +1 (650) 488-8398</p>
              <p>Sito web : www.vercel.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              4. Proprietà intellettuale
            </h2>
            <p>
              L'intero sito è soggetto alla legislazione francese e internazionale sul 
              diritto d'autore e sulla proprietà intellettuale. Tutti i diritti di riproduzione, 
              rappresentazione e utilizzo sono riservati per tutti gli elementi 
              del sito, inclusi testi, articoli, disegni, immagini, loghi, icone, ecc.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              5. Cookie
            </h2>
            <p>
              Il sito www.flocon.fr utilizza cookie necessari per il suo corretto funzionamento 
              e cookie di misurazione del pubblico. L'utente ha la possibilità di disattivare 
              questi cookie nelle impostazioni del suo browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              6. CNIL
            </h2>
            <p>
              In conformità con la legge Informatica e Libertà del 6 gennaio 1978 modificata, 
              ogni utente ha diritto di accesso, rettifica, cancellazione 
              e opposizione ai dati personali che lo riguardano. Per esercitare questo diritto, 
              è sufficiente contattarci all'indirizzo email: contact@flocon.fr.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              7. Controversie
            </h2>
            <p>
              In caso di controversia, e dopo aver tentato una risoluzione bonaria, il cliente può 
              rivolgersi al mediatore dei consumatori competente o al tribunale commerciale 
              di Parigi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              8. Crediti
            </h2>
            <div className="space-y-2">
              <p>• Tecnologie utilizzate:</p>
              <p>• Framework : Next.js 14</p>
              <p>• Hosting : Vercel</p>
              <p>• Pagamento : Stripe</p>
              <p>• Immagini : Unsplash e fotografi professionisti</p>
              <p>• Icone : Lucide React</p>
            </div>
          </section>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              Data ultimo aggiornamento: 20 gennaio 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
