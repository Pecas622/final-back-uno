import { faker } from "@faker-js/faker";
faker.locale = 'es';

const createMockUser = () => {
  const roles = ["usuario", "admin", "premium"];
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const birthdate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const location = `${faker.location.city()}, ${faker.location.state()}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@tiendafalsa.com`;
  const password = faker.internet.password({ length: 10, memorable: true });
  const avatar = faker.image.avatarGitHub(); // imagen estilo perfil
  const role = faker.helpers.arrayElement(roles);

  return {
    fullName,
    birthdate,
    location,
    email,
    password,
    avatar,
    role,
  };
};

export default createMockUser;
