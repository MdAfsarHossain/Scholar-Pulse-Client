# [SCHOLAR PULSE](https://scholarplus-c83e6.web.app/)

###
The `SCHOLAR PULSE` is a comprehensive platform designed to simplify the process of discovering, managing, and applying for scholarships. The system supports three user roles: `users`, `moderators`, and `admins`. Users can browse and apply for scholarships, while moderators and admins manage scholarship entries. The platform features a user-friendly interface and includes advanced `filters` and `search` options, ensuring applicants can easily find scholarships that meet their needs. The system also highlights `top scholarships` with `low application fees` and `recent postings` on the homepage.

The project focuses on `efficiency`, `transparency`, and `accessibility`, providing detailed scholarship information such as university `name`, `logo`, `location`, `ranking`, `category`, `tuition fees`, and `application deadlines`. A dedicated review system allows users to share `feedback` about scholarships, further enhancing the platform's credibility.


## [Key Features]()
- `Role-Based Access:`
    - `Users`: `Browse` and `apply` for scholarships.
    - `Moderators and Admins`: `Add` and `manage scholarship data`.
- `Top Scholarships Section:`
    - Displays eight scholarships with low application fees and recent postings on the homepage.
- `Detailed Scholarship Information:`
    - Scholarship name, university details (name, logo, location, and ranking).
    - `Categories:` Subject (e.g., Engineering, Agriculture), Scholarship type (e.g., Full Fund, Partial, Self-Fund).
    - `Degree levels:` Diploma, Bachelor’s, Master’s.
    - Tuition fees, application fees, service charges, and deadlines.
- `Scholarship Application Management:`
    - Users can apply for scholarships, with real-time validation and notifications.
- `Search and Filter Functionality:`
    - Advanced filtering options to search scholarships by application fees, post date, or other criteria.
- `Review and Rating System:`
    - Users can leave reviews, including ratings, comments, and the reviewer's profile (name, image, and date).
    - Reviews are displayed in a carousel format on the scholarship details page.
- `Responsive Design:`
    - Fully optimized for mobile, tablet, and desktop devices.
- `Security and Authentication:`
    - Secure user login with role-based permissions to ensure data integrity.

## [Purpose of Scholar Pulse]()
-  `Centralized Platform:` 
    - To provide a one-stop solution for students to discover and apply for scholarships while enabling institutions to manage scholarship data efficiently.
- `Student Empowerment:`
    - Simplify the process of finding and applying for scholarships.
    - Offer detailed scholarship information, including fees, deadlines, and eligibility.
    - Provide a review and rating system for transparency and informed decision-making.
- `Administrative Efficiency:`
    - Facilitate easy addition, updating, and deletion of scholarships for moderators and administrators.
    - Highlight affordable and recently posted scholarships to attract more applicants.
- `Community Engagement:`
    - Enable users to share experiences and leave reviews for scholarships.
    - Build trust through transparent and collaborative features.
- `Accessibility and Inclusivity:`
    - Save time and effort with a user-friendly interface.
    - Make scholarships more accessible to a broader audience through responsive design and intuitive navigation.
- `Goal-Oriented:`
    - Empower students with educational opportunities while creating a fair and efficient scholarship ecosystem for all stakeholders.


## [Technology Stack]()
- `Frontend:` React, Tailwind CSS, Daisy UI.
- `Backend:` Node.js, Express.js.
- `Database:` MongoDB.
- `Authentication:` Firebase.
- `APIs:` RESTful APIs for data retrieval and management.


## [Dependencies]()
- `@headlessui/react`: ^2.2.0
- `@heroicons/react`: ^2.2.0
- `@stripe/react-stripe-js`: ^3.1.1
- `@stripe/stripe-js`: ^5.5.0
- `@tanstack/react-query`: ^5.64.0
- `@tanstack/react-query-devtools`: ^5.64.0
- `axios`: ^1.7.9
- `firebase`: ^11.1.0
- `prop-types`: ^15.8.1
- `react`: ^18.3.1
- `react-date-range`: ^2.0.1
- `react-datepicker`: ^7.6.0
- `react-dom`: ^18.3.1
- `react-google-charts`: ^5.2.1
- `react-helmet-async`: ^2.0.5
- `react-hook-form`: ^7.54.2
- `react-hot-toast`: ^2.5.1
- `react-icons`: ^5.4.0
- `react-router-dom`: ^6.28.1
- `react-simple-typewriter`: ^5.0.1
- `react-spinners`: ^0.15.0
- `swiper`: ^11.2.1

## [Installation]()
- Run `npm install` to install project Dependencies

## [How to Run]()
1. Clone the repository
```js
git clone https://github.com/MdAfsarHossain/Scholar-Pulse-Client.git
cd scholar-pulse-client
```

2. Install dependencies using
```js
npm install
```
3. Setup Environment Variables
- Create `.env.local` in the root directory.
- Add `VITE_API_URL` variable and put your server url here.
- Create a firebase project and add config here firebase config will look like
```js
VITE_apiKey
VITE_authDomain
VITE_projectId
VITE_storageBucket
VITE_messagingSenderId
VITE_appId
```
4. Run the website to locally
```js
npm run dev
```
5. Open the website in your local browser http://localhost:5173

## [Deployment]()
- Hosted on Netlify or Vercel for a fast and reliable experience.
- Firebase Authentication requires authorized domains to ensure secure access.
## [Contributions]()
- Contributions are welcome! Fork this repository, make your changes, and submit a pull request.

### [Live Site Link](https://scholarplus-c83e6.web.app/)
### [Client Site Link](https://scholar-pulse-server.vercel.app)