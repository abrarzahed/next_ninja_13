import Link from "next/link";

const getTickets = async () => {
  // imitate delay
  await new Promise((resolve) => setInterval(resolve, 2000));
  const response = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache ,
    },
  });
  return response.json();
};
const TicketList = async () => {
  const tickets = await getTickets();
  console.log(tickets);
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 190)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} Priority
            </div>
          </Link>
        </div>
      ))}

      {tickets.length === 0 && (
        <p className="text-center">There are n open tickets</p>
      )}
    </>
  );
};

export default TicketList;
