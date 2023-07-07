function getRandomColor() {
  const symbols = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return color;
}

function createContactCard(contact) {
  const { id, name, email, phone, address } = contact;
  const avatarColor = getRandomColor();
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");

  const card = document.createElement("div");
  card.classList.add("card");
  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.style.backgroundColor = avatarColor;
  avatar.textContent = initials;

  const fullName = document.createElement("h3");
  fullName.textContent = name;
  const contactDetails = document.createElement("div");
  contactDetails.classList.add("contact-details");

  const emailLink = document.createElement("a");
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
  const phoneLink = document.createElement("a");
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;

  const addressText = document.createTextNode(
    `Address: ${address.city}, ${address.street}, ${address.suite}`
  );

  contactDetails.appendChild(emailLink);
  contactDetails.appendChild(document.createTextNode(" | "));
  contactDetails.appendChild(phoneLink);
  card.appendChild(avatar);
  card.appendChild(fullName);
  card.appendChild(contactDetails);
  card.appendChild(addressText);

  return card;
}

async function fetchContacts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const contacts = await response.json();

    const contactsContainer = document.getElementById("contacts");
    contacts.forEach((contact) => {
      const card = createContactCard(contact);
      contactsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchContacts();
