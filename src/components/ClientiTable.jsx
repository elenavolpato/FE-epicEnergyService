import { Table, Container } from "react-bootstrap"

function ClientiTable({ clienti }) {
  return (
    <Container
      className="mt-4"
      fluid
    >
      <Table
        striped
        bordered
        hover
        responsive
      >
        <thead>
          <tr>
            <th>Logo</th>
            <th>Ragione Sociale</th>
            <th>Partita IVA</th>
            <th>Tipo</th>
            <th>Email</th>
            <th>PEC</th>
            <th>Telefono</th>
            <th>Fatturato Annuale</th>
            <th>Nome Contatto</th>
            <th>Cognome Contatto</th>
            <th>Email Contatto</th>
            <th>Telefono Contatto</th>
            <th>Sede Legale</th>
            <th>Sede Operativa</th>
            <th>Data Inserimento</th>
            <th>Ultimo Contatto</th>
          </tr>
        </thead>
        <tbody>
          {clienti.map((c) => (
            <tr key={c.id}>
              {/* <td>
                {c.logoAziendale ? (
                  <Image
                    src={c.logoAziendale}
                    alt="logo"
                    width={40}
                    height={40}
                    roundedCircle
                  />
                ) : (
                  "—"
                )}
              </td> */}
              <td>{c.ragioneSociale}</td>
              <td>{c.partitaIva}</td>
              <td>{c.tipo}</td>
              <td>{c.email}</td>
              <td>{c.pec}</td>
              <td>{c.telefono}</td>
              <td>
                {c.fatturatoAnnuale?.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "EUR",
                })}
              </td>
              <td>{c.nomeContatto}</td>
              <td>{c.cognomeContatto}</td>
              <td>{c.emailContatto}</td>
              <td>{c.telefonoContatto}</td>
              <td>{c.sedeLegale ? `${c.sedeLegale.via} ${c.sedeLegale.civico}, ${c.sedeLegale.localita} (${c.sedeLegale.cap})` : "—"}</td>
              <td>{c.sedeOperativa ? `${c.sedeOperativa.via} ${c.sedeOperativa.civico}, ${c.sedeOperativa.localita} (${c.sedeOperativa.cap})` : "—"}</td>
              <td>{c.dataInserimento}</td>
              <td>{c.dataUltimoContatto}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ClientiTable
