import { notFound } from "next/navigation";
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const id = params.id;
  const res = await fetch(`http://localhost:4000/tickets/${id}`);
  const ticket = await res.json();

  return {
    title: `Dojo Helpdesk | ${ticket?.title}`,
  };
}

export async function generateStaticParams() {
  const response = await fetch("http://localhost:4000/tickets");
  const tickets = await response.json();
  return tickets.map((ticket) => ({ id: ticket.id }));
}

const getTicket = async (id) => {
  // imitate delay
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));

  const response = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  if (!response.ok) {
    notFound();
  }
  return response.json();
};

const TicketDetails = async ({ params }) => {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} Priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
