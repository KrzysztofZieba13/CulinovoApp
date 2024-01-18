# [EN] Culinovo Project
[CulinovoApp](https://culinovo-db.firebaseapp.com/index.html)<br>
Culinovo is a web application written in Vanilla JavaScript using the Model-View-Controller (MVC) architecture. The project utilizes Firebase for backend operations, with data stored in the Realtime Database. The database handles information such as user emails, menu products, notifications, order history, and the queue of orders for admin management. To ensure security, the database is protected by specific rules.

## Features

- **User Authentication:**
  - The application allows users to create accounts with full validation and real-time feedback displayed on the UI.
  - Testing is possible using anonymous, admin, and regular user accounts. However, to access admin functionalities, refer to the example admin account details provided below.

- **Functionality:**
  - **Anonymous User:**
    - Can create an account.
    - Can select products and place orders.
    - No access to order status information or order history.
    - Basket contents are stored in LocalStorage, persisting even after a page refresh.

  - **Logged User:**
    - Same options as anonymous users.
    - Access to order history.
    - Real-time order status notifications via the notification (🔔button).

  - **Admin:**
    - Manages orders in the queue, including changing the order status.
    - Can reject orders (❌ button), mark orders as "in progress" (⌛), and confirm order delivery (✅).
    - Switches between admin and user panels.
    - Can place orders as a regular user.

## Example Accounts

**Admin Account:**
- Email: admin@example.com
- Password: test1234

**User Account:**
- Email: user@example.com
- Password: test1234

Feel free to explore the functionalities using the provided example accounts. For admin tasks, use the admin account credentials.



<br><br><br><br>



# [PL] Projekt Culinovo
[CulinovoApp](https://culinovo-db.firebaseapp.com/index.html)<br>
Culinovo to aplikacja internetowa napisana w Vanilla JavaScript, wykorzystująca architekturę Model-View-Controller (MVC). Projekt korzysta z Firebase jako backendu, a dane przechowywane są w bazie danych czasu rzeczywistego. Baza danych zawiera informacje takie jak maile użytkowników, produkty w menu, powiadomienia dla użytkowników, historia zamówień oraz kolejka zamówień do zarządzania przez administratora. Aby zapewnić bezpieczeństwo, baza danych jest zabezpieczona określonymi regułami.

## Funkcje

- **Autentykacja Użytkownika:**
  - Aplikacja umożliwia użytkownikom tworzenie kont z pełną walidacją i informacjami zwrotnymi wyświetlanymi w czasie rzeczywistym na interfejsie użytkownika.
  - Testowanie możliwe jest przy użyciu kont anonimowych, administratora i standardowego użytkownika. Jednak do uzyskania dostępu do funkcji administratora, odwołaj się do podanych poniżej danych przykładowego konta administratora.

- **Funkcjonalności:**
  - **Użytkownik Anonimowy:**
    - Może stworzyć konto.
    - Może wybierać produkty i składać zamówienia.
    - Brak dostępu do informacji o statusie zamówienia lub historii zamówień.
    - Zawartość koszyka jest przechowywana w LocalStorage i utrzymuje się nawet po odświeżeniu strony.

  - **Zalogowany Użytkownik:**
    - Te same opcje co dla użytkowników anonimowych.
    - Dostęp do historii zamówień.
    - Powiadomienia w czasie rzeczywistym dotyczące statusu zamówienia za pomocą przycisku powiadomień (🔔).

  - **Administrator:**
    - Zarządza zamówieniami w kolejce, zmieniając status zamówienia.
    - Może odrzucać zamówienia (przycisk ❌), oznaczać zamówienia jako "w trakcie realizacji" (⌛) i potwierdzać dostarczenie zamówienia (✅).
    - Przełącza się między panelem administratora a panelem użytkownika.
    - Może składać zamówienia jako standardowy użytkownik.

## Przykładowe Konta

**Konto Administratora:**
- Email: admin@example.com
- Hasło: test1234

**Konto Użytkownika:**
- Email: user@example.com
- Hasło: test1234

Zapraszamy do eksplorowania funkcji za pomocą podanych kont przykładowych. Do zadań administratorskich użyj danych konta administratora.

