import React from "react";
import { Link } from "react-router-dom";
import StaffCard from "../components/StaffCard";

const users = [
    {
      id: 1,
      name: "John Doe",
      profession: "Software Engineer",
      avatar: "https://example.com/johndoe.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 2,
      name: "Jane Smith",
      profession: "UX Designer",
      avatar: "https://example.com/janesmith.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 3,
      name: "Alice Johnson",
      profession: "Data Scientist",
      avatar: "https://example.com/alicejohnson.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 4,
      name: "Bob Anderson",
      profession: "Frontend Developer",
      avatar: "https://example.com/bobanderson.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 5,
      name: "Eva Williams",
      profession: "Graphic Designer",
      avatar: "https://example.com/evawilliams.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 6,
      name: "David Brown",
      profession: "System Administrator",
      avatar: "https://example.com/davidbrown.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 7,
      name: "Sophie Miller",
      profession: "Product Manager",
      avatar: "https://example.com/sophiemiller.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 8,
      name: "Michael White",
      profession: "Mobile App Developer",
      avatar: "https://example.com/michaelwhite.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 9,
      name: "Olivia Taylor",
      profession: "UI Developer",
      avatar: "https://example.com/oliviataylor.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 10,
      name: "Henry Harris",
      profession: "Network Engineer",
      avatar: "https://example.com/henryharris.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 11,
      name: "Grace Wilson",
      profession: "Content Writer",
      avatar: "https://example.com/gracewilson.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 12,
      name: "Tom Thompson",
      profession: "DevOps Engineer",
      avatar: "https://example.com/tomthompson.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 13,
      name: "Emily Davis",
      profession: "Cybersecurity Analyst",
      avatar: "https://example.com/emilydavis.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 14,
      name: "Chris Carter",
      profession: "QA Tester",
      avatar: "https://example.com/chriscarter.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 15,
      name: "Mia Moore",
      profession: "Scrum Master",
      avatar: "https://example.com/miamoore.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 16,
      name: "Nathan Nelson",
      profession: "Full Stack Developer",
      avatar: "https://example.com/nathannelson.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 17,
      name: "Isabel Martin",
      profession: "Business Analyst",
      avatar: "https://example.com/isabelmartin.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 18,
      name: "Jake Johnson",
      profession: "UX Researcher",
      avatar: "https://example.com/jakejohnson.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 19,
      name: "Lily Lee",
      profession: "AI Engineer",
      avatar: "https://example.com/lilylee.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 20,
      name: "Samuel Scott",
      profession: "Database Administrator",
      avatar: "https://example.com/samuelscott.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 21,
      name: "Sophia Sanchez",
      profession: "Digital Marketing Specialist",
      avatar: "https://example.com/sophiasanchez.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 22,
      name: "Max Murphy",
      profession: "IT Consultant",
      avatar: "https://example.com/maxmurphy.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 23,
      name: "Aiden Adams",
      profession: "Game Developer",
      avatar: "https://example.com/aidenadams.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 24,
      name: "Ella Evans",
      profession: "UI/UX Designer",
      avatar: "https://example.com/ellaevans.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 25,
      name: "Caleb Clarke",
      profession: "Machine Learning Engineer",
      avatar: "https://example.com/calebclarke.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 26,
      name: "Ava Allen",
      profession: "Digital Illustrator",
      avatar: "https://example.com/avaallen.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 27,
      name: "Owen Olsen",
      profession: "Cloud Architect",
      avatar: "https://example.com/owenolsen.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 28,
      name: "Mila Miller",
      profession: "AR/VR Developer",
      avatar: "https://example.com/milamiller.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 29,
      name: "Leo Lewis",
      profession: "Data Analyst",
      avatar: "https://example.com/leolewis.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
    {
      id: 30,
      name: "Hazel Hayes",
      profession: "E-learning Specialist",
      avatar: "https://example.com/hazelhayes.jpg",
      actions: ["Task 1", "Task 2", "Task 3"],
    },
  ];


function Staff() {
  return (
    <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {users.map((user) => (
          <Link key={user.id} to={`/staff/${user.id}`}>
            <StaffCard user={user}/>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Staff;
