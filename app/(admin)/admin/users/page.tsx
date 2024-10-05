"use client";

import AppTable from "@/app/components/table/app-table";
import { TableColumnModel } from "@/app/components/table/table-colum-model";

export default function UsersPage() {
  // Sample data
  const users = [
    { id: 1, username: "John Doe", email: "john@example.com", activated: 1 }, // 1 for active
    { id: 2, username: "Jane Smith", email: "jane@example.com", activated: 0 }, // 0 for inactive
    { id: 3, username: "Alice Johnson", email: "alice@example.com", activated: 1 }, // 1 for active
    { id: 4, username: "Bob Brown", email: "bob@example.com", activated: 2 }, // 2 for pending
    { id: 5, username: "Charlie Green", email: "charlie@example.com", activated: 1 },
    { id: 6, username: "Diana Prince", email: "diana@example.com", activated: 0 },
    { id: 7, username: "Ethan Hunt", email: "ethan@example.com", activated: 2 },
    { id: 8, username: "Fiona Gallagher", email: "fiona@example.com", activated: 1 },
    { id: 9, username: "George Lucas", email: "george@example.com", activated: 1 },
    { id: 10, username: "Hannah Montana", email: "hannah@example.com", activated: 0 },
    { id: 11, username: "Ian Malcolm", email: "ian@example.com", activated: 2 },
    { id: 12, username: "Jessica Jones", email: "jessica@example.com", activated: 1 },
    { id: 13, username: "Kevin Bacon", email: "kevin@example.com", activated: 1 },
    { id: 14, username: "Laura Croft", email: "laura@example.com", activated: 0 },
    { id: 15, username: "Michael Scott", email: "michael@example.com", activated: 2 },
    { id: 16, username: "Nina Simone", email: "nina@example.com", activated: 1 },
    { id: 17, username: "Oscar Isaac", email: "oscar@example.com", activated: 1 },
    { id: 18, username: "Pam Beesly", email: "pam@example.com", activated: 0 },
    { id: 19, username: "Quentin Tarantino", email: "quentin@example.com", activated: 2 },
    { id: 20, username: "Rachel Green", email: "rachel@example.com", activated: 1 },
    { id: 21, username: "Steve Rogers", email: "steve@example.com", activated: 1 },
    { id: 22, username: "Tony Stark", email: "tony@example.com", activated: 0 },
    { id: 23, username: "Uma Thurman", email: "uma@example.com", activated: 2 },
    { id: 24, username: "Vin Diesel", email: "vin@example.com", activated: 1 },
    { id: 25, username: "Will Smith", email: "will@example.com", activated: 1 },
    { id: 26, username: "Xena Warrior", email: "xena@example.com", activated: 0 },
    { id: 27, username: "Yoda", email: "yoda@example.com", activated: 2 },
    { id: 28, username: "Zoe Saldana", email: "zoe@example.com", activated: 1 },
    { id: 29, username: "Aaron Paul", email: "aaron@example.com", activated: 1 },
    { id: 30, username: "Bella Swan", email: "bella@example.com", activated: 0 },
    { id: 31, username: "Chris Hemsworth", email: "chris@example.com", activated: 2 },
    { id: 32, username: "Daisy Ridley", email: "daisy@example.com", activated: 1 },
    { id: 33, username: "Ewan McGregor", email: "ewan@example.com", activated: 1 },
    { id: 34, username: "Freddie Mercury", email: "freddie@example.com", activated: 0 },
    { id: 35, username: "Gwen Stefani", email: "gwen@example.com", activated: 2 },
    { id: 36, username: "Hugh Jackman", email: "hugh@example.com", activated: 1 },
    { id: 37, username: "Isla Fisher", email: "isla@example.com", activated: 1 },
    { id: 38, username: "Jack Sparrow", email: "jack@example.com", activated: 0 },
    { id: 39, username: "Katy Perry", email: "katy@example.com", activated: 2 },
    { id: 40, username: "Leonardo DiCaprio", email: "leonardo@example.com", activated: 1 },
    { id: 41, username: "Megan Fox", email: "megan@example.com", activated: 1 },
    { id: 42, username: "Natalie Portman", email: "natalie@example.com", activated: 0 },
    { id: 43, username: "Orlando Bloom", email: "orlando@example.com", activated: 2 },
    { id: 44, username: "Penelope Cruz", email: "penelope@example.com", activated: 1 },
    { id: 45, username: "Quincy Jones", email: "quincy@example.com", activated: 1 },
    { id: 46, username: "Rihanna", email: "rihanna@example.com", activated: 0 },
    { id: 47, username: "Samuel L. Jackson", email: "samuel@example.com", activated: 2 },
    { id: 48, username: "Tina Fey", email: "tina@example.com", activated: 1 },
    { id: 49, username: "Usher", email: "usher@example.com", activated: 1 },
    { id: 50, username: "Vince Vaughn", email: "vince@example.com", activated: 0 },
  ];

  // Columns definition
  const headerColumns: TableColumnModel[] = [
    { name: "Username", sortable: true },
    { name: "Email", sortable: false },
    { name: "Activated", sortable: false },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      <AppTable headerColumns={headerColumns} items={users} />
    </div>
  );
}
