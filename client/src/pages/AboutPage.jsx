import Navbar from "../components/Navbar";
import React from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ben",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQEPPe9oOOqbgg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691579027773?e=1738800000&v=beta&t=955U5tPINnXaFNYmrfFKsbego0mowqH-iA6HbEzaWhk",
    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/Ben-Kilinski",
    email:
      "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AcMMx-fur11SmcHffOEjaBF9pkEMlG3p639180pmylz21toNyxG0NJH5tjnCrYKsJawro6LS4r87Fg&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1825368990%3A1733391002986747&ddm=1",
  },
  {
    name: "Liav",
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQHXICd26TbbEw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727113629944?e=1738800000&v=beta&t=F3MazAr9wJtwLoidj365Bc64SalVL7qJtHI34JofNGo",
    linkedin: "https://www.linkedin.com/in/liav-ben-shimon/",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/liavbenshimon",
    email:
      "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AcMMx-fur11SmcHffOEjaBF9pkEMlG3p639180pmylz21toNyxG0NJH5tjnCrYKsJawro6LS4r87Fg&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1825368990%3A1733391002986747&ddm=1",
  },
  {
    name: "Nimrod",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQF5nrXeEk3LIQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727718821623?e=1738800000&v=beta&t=9IIbAtS-Tb9m1zgYGdwthm0ZQTlys265YUy4VEqOspk",
    linkedin: "https://www.linkedin.com/in/nimrod-amos-a27a4b320/",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/nimrodamos",
    email:
      "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AcMMx-fur11SmcHffOEjaBF9pkEMlG3p639180pmylz21toNyxG0NJH5tjnCrYKsJawro6LS4r87Fg&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1825368990%3A1733391002986747&ddm=1",
  },
];

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Our Team</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto"></div>
        </div>

        {/* Team Members Section */}
        <div className="flex flex-wrap justify-center gap-12 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center group relative"
            >
              {/* Circular Photo */}
              <div className="relative overflow-hidden rounded-full w-40 h-40 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name */}
              <p className="mt-4 text-xl font-semibold">{member.name}</p>

              {/* Icons Below Name, Visible Only on Hover */}
              <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:scale-125 transition-transform"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:scale-125 transition-transform"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:scale-125 transition-transform"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={member.email}
                  className="text-red-600 hover:scale-125 transition-transform"
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Explanatory Text */}
        <div className="max-w-3xl text-center">
          <p className="text-lg leading-relaxed">
            Hello there, that's a mock social media built as our students'
            project. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis
            euismod malesuada. Phasellus at tincidunt enim. Aliquam erat
            volutpat. Ut feugiat velit sit amet orci malesuada, a porttitor elit
            gravida. Pellentesque vel urna nec leo ultrices viverra ac vel
            purus. Nullam congue tortor in quam tempus, vitae auctor metus
            mollis. Aenean sit amet felis sit amet justo tincidunt porttitor non
            vel libero.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
