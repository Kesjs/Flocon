import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CGV() {
  return (
    <div className="pt-28 min-h-screen bg-gray-50 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold text-textDark mb-8">
          Condizioni Generali di Vendita
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              1. Oggetto
            </h2>
            <p>
              Le presenti Condizioni Generali di Vendita (CGV) regolano i rapporti contrattuali 
              tra la società Flocon, SAS con capitale di 10 000€, iscritta al RCS di Parigi 
              con il numero 123 456 789, con sede legale in 123 Rue de la Mode, 
              75001 Parigi, Francia, e qualsiasi persona fisica o giuridica che acquista prodotti 
              sul sito internet www.flocon.fr.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              2. Prodotti
            </h2>
            <p>
              I prodotti offerti in vendita sono quelli presenti sul sito internet 
              www.flocon.fr nei limiti delle scorte disponibili. Flocon si impegna a fornire 
              informazioni il più precise possibile sulle caratteristiche dei prodotti. 
              Tuttavia, le foto dei prodotti non sono contrattuali.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              3. Prezzi
            </h2>
            <p>
              I prezzi sono indicati in euro, tasse incluse (IVA). I costi di spedizione 
              sono calcolati in base all'importo totale dell'ordine e alla modalità di spedizione scelta. 
              Flocon si riserva il diritto di modificare i prezzi in qualsiasi momento, i prodotti essendo fatturati 
              sulla base delle tariffe in vigore al momento della conferma dell'ordine.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              4. Ordine
            </h2>
            <p>
              Ogni ordine effettuato sul sito www.flocon.fr costituisce la formazione di un contratto 
              di vendita tra il cliente e Flocon. La conferma dell'ordine avviene dopo 
              la conferma del pagamento da parte del cliente. Flocon si riserva il diritto di rifiutare 
              qualsiasi ordine per motivi legittimi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              5. Pagamento
            </h2>
            <p>
              Il pagamento avviene tramite carta di credito tramite il nostro partner Stripe, sicuro 
              secondo il protocollo SSL. L'addebito sulla carta viene effettuato al momento della conferma 
              dell'ordine. In caso di rifiuto del pagamento da parte del centro di autorizzazione bancaria, 
              l'ordine verrà annullato.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              6. Spedizione
            </h2>
            <p>
              I prodotti vengono spediti all'indirizzo di spedizione indicato dal cliente. 
              I tempi di spedizione sono di 3-5 giorni lavorativi per la Francia metropolitana. 
              Le spese di spedizione sono gratuite a partire da 50€ di acquisto. In caso di ritardo nella spedizione 
              superiore a 30 giorni, il cliente può risolvere la vendita.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              7. Diritto di recesso
            </h2>
            <p>
              In conformità con le disposizioni dell'articolo L121-21 del Codice del consumo, 
              il cliente ha un termine di 14 giorni dalla ricezione del suo ordine 
              per esercitare il suo diritto di recesso senza dover giustificare motivi né pagare 
              penalità. Le spese di restituzione sono a carico del cliente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              8. Garanzia
            </h2>
            <p>
              Tutti i prodotti beneficiano della garanzia legale di conformità di 2 anni. 
              In caso di non conformità, il cliente può cambiare il prodotto o ottenere un rimborso. 
              La garanzia non copre i danni derivanti da un uso improprio o da un 
              uso non conforme dei prodotti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              9. Dati personali
            </h2>
            <p>
              Le informazioni personali raccolte durante l'ordine vengono trattate 
              in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR). 
              Il cliente ha diritto di accesso, modifica e cancellazione dei suoi dati.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              10. Controversie
            </h2>
            <p>
              Per qualsiasi controversia, il cliente può contattare il servizio clienti all'indirizzo 
              contact@flocon.fr. In assenza di accordo bonario, la controversia sarà sottoposta 
              al tribunale commerciale di Parigi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              11. Proprietà intellettuale
            </h2>
            <p>
              Tutti gli elementi del sito www.flocon.fr, inclusi testi, immagini, 
              grafica, loghi e icone, sono proprietà esclusiva di Flocon e sono protetti 
              dal diritto d'autore. Qualsiasi riproduzione, distribuzione o modifica di questi elementi 
              è severamente vietata senza autorizzazione preventiva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-textDark mb-4">
              12. Forza maggiore
            </h2>
            <p>
              Flocon non potrà essere ritenuta responsabile in caso di inadempimento o ritardo 
              nell'esecuzione dei suoi obblighi dovuto a un caso di forza maggiore, in particolare 
              sciopero, guasto, guerra, tumulto, o qualsiasi evento fuori dal suo controllo.
            </p>
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
