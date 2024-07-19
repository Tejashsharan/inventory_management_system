import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [state, setState] = useState("hidden");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setState("show");
        } else {
          setState("hidden");
        }
      });
    });

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [sectionRef]);


  return (
    <div>
      <section className="firstLook">
        <img alt="man" src='https://th.bing.com/th/id/OIP.jO0HYnXop8J0sREgU1F8YwHaFR?rs=1&pid=ImgDetMain' />
        <section className={`heading`}>
          <h1 style={{ color: "black" }}>Welcome to </h1>
          <h1 style={{ color: 'green' }}>MoneyControl</h1>
          <div className='wrapper'>
            <div className='static-txt'> We helps in mangeing</div>
            <ul className='dynamic-txt'>
              <li><span>Inventories</span></li>
              <li><span>Taxes</span></li>
              <li><span>Stats</span></li>
              <li><span>Transactions</span></li>
            </ul>
          </div>
          <p >Hello , welcome to the world's best Inventory manangement system here we will provide you some of the best tools through which you can manage your inverntories without any worries .</p>
        </section>
      </section>

      <section className='secondLook'>

        <section className='text'>
          <ul className='movingText' >
            <li className='list1'>
              <h3 >Stats</h3>
              <p >Our system helps manage your stats by providing real-time tracking, detailed analytics, automated reporting, and customizable alerts. This ensures you have accurate, up-to-date information at all times, allowing you to make informed decisions and optimize your inventory.</p>
            </li>
            <li className='list2'>
              <h3 >Transaction Tracking</h3>
              <p>Our system accurately tracks transactions, providing detailed reports and real-time updates to help you monitor sales, purchases, and financial performance seamlessly, enhancing financial transparency and accountability.</p>
            </li>
            <li className='list3'>
              <h3 >Tax Calculation</h3>
              <p > Our system simplifies tax calculations by automating tax reporting and compliance, ensuring accurate and timely filings with detailed, up-to-date information, reducing errors and saving valuable time.</p>
            </li>
            <li className='list4'>
              <h3 >Inventory Manangement</h3>
              <p>Our system streamlines inventory management with real-time tracking, automated restocking, detailed analytics, and customizable alerts, ensuring optimal stock levels, efficient operations, and reduced costs.</p>
            </li>
          </ul>
        </section>

        <section className='animation'>
          <section className='animated_images'>
            <div className='image'>
              <img className='image_1' alt='stats' src='https://th.bing.com/th/id/OIP.9qvo5IvxkYxPZF32Dg9dSQHaGN?rs=1&pid=ImgDetMain' />

              <img className='image_2' alt="inventory" src='https://www.vedaerp.com/wp-content/uploads/2021/01/inventory-management.png' />

              <img className='image_3' alt="taxes" src='https://www.pngmart.com/files/7/Tax-PNG-Photos.png' />

              <img className='image_4' alt="transaction" src='https://cdn-icons-png.flaticon.com/512/3584/3584670.png' />

            </div>
          </section>
        </section>

      </section>

      <section ref={sectionRef} className={`thirdLook  ${state}`}>
        <div>
          <h3>User Profiles and Roles</h3>
          <div>
            <p>
              User profiles should encompass comprehensive details such as contact information, roles, permissions, and historical activity. These profiles ensure a thorough understanding of each user’s interactions and access within the system. Role-Based Access Control (RBAC) plays a pivotal role by assigning specific roles, such as admin, manager, or staff, to users. Each role is equipped with tailored permissions to guarantee that users can only access the information and functionalities pertinent to their responsibilities. This hierarchical approach to access control enhances security, prevents unauthorized access, and streamlines the user experience by limiting unnecessary access to sensitive data.</p>

            <img src='https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Clipart.png' alt='userProfile' height={"100px"} />
          </div>
        </div>
        <div>
          <h3>Inventory Optimization</h3>
          <div>
            <p>Demand forecasting leverages historical data and predictive analytics to anticipate future demand, enabling businesses to optimize stock levels efficiently. By analyzing past trends and patterns, companies can predict demand fluctuations and adjust their inventory accordingly, minimizing the risk of overstocking or stockouts. Additionally, maintaining safety stock is crucial to buffer against unexpected demand spikes or supply chain disruptions. Safety stock acts as a protective measure, ensuring that customer needs are met even during unforeseen circumstances. Together, demand forecasting and safety stock calculation enhance inventory management, improve customer satisfaction, and reduce operational costs by maintaining optimal stock levels.</p>

            <img src='https://www.supplymint.com/blogs/wp-content/uploads/2022/05/warehouse-management-software.png' alt='inventoryOpetimisation' height={"100px"} />
          </div>
        </div>
        <div>
          <h3>Sales and Purchases</h3>
          <div>
            <p>Sales orders involve recording and processing customer orders, updating inventory levels, and generating invoices. This process ensures that customer requests are accurately captured and fulfilled, maintaining up-to-date inventory records and facilitating timely billing.

              On the other hand, purchase orders entail creating and managing orders for goods from suppliers. This includes tracking the receipt of goods and updating inventory levels accordingly. Effective management of purchase orders ensures a seamless supply chain, maintaining adequate stock levels to meet demand and preventing disruptions in the production process. Both processes are essential for efficient inventory and financial management.</p>

            <img src='https://icon-library.com/images/purchase-icon-png/purchase-icon-png-19.jpg' alt='salesAndPurchase' height={"100px"} />
          </div>
        </div>
        <div>
          <h3>Tax Calculation</h3>
          <div>
            <p>Sales tax is automatically calculated based on the product type and the customer’s location, ensuring accurate and compliant tax charges on each transaction. This automation simplifies the checkout process, reducing errors and streamlining financial operations.

              Value-Added Tax (VAT) management involves calculating VAT accurately, ensuring compliance with regional tax laws. This includes tracking VAT on sales and purchases, generating appropriate tax reports, and ensuring that all VAT obligations are met. Effective VAT management is crucial for regulatory compliance and helps prevent potential legal issues, ensuring smooth and lawful business operations..</p>

            <img src='https://th.bing.com/th/id/OIP.CZ16N9yataEkwoycQqI4zgAAAA?rs=1&pid=ImgDetMain' alt='taxCalculation' height={"100px"} />
          </div>
        </div>
      </section>

      <section className="fourthLook">
        <h2 style={{ color: "green" }}>Testimonials</h2>
        <div className='flexi'>
          <div>
            <img alt='joe Mathews' src='https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-HD-Photos.png' height={"100px"} />
            <h4>Joe Mathews</h4>
            <p>This app is a blessing for me , it helped me managing my data . It managed all of the burden which i wss facing since years , it helped me in managing my transaction , my taxes and also adding inventory to the site is really easy which made me upgrade my setup from notepads to the application.
            </p>
            <p style={{ marginTop: "10px" }}>
              Thanks for all the help that you served me :)
            </p>
          </div>

          <div>
            <img alt='Angilina Mathews' src='https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-HD-Photos.png' height={"100px"} />
            <h4>Angilina Mathews</h4>
            <p>My business was in early stage and it was really hard for me to manage the inventories and to analyise the sales transaction and other stuff and then i came to know about this app , now this apps manages all the stuffs for me from managing inventories to transactions , so that i can better focus on by business.
            </p>
            <p style={{ marginTop: "10px" }}>
              You saved my day...
            </p>
          </div>
        </div>
      </section>

      <section className='footer'>
        <div className='socialMedia'>
          <ul>
            <li>
              <img alt='facebook' src='https://cdn-icons-png.flaticon.com/512/1051/1051309.png' />
            </li>
            <li>
              <img alt='twitter' src='https://cdn-icons-png.flaticon.com/512/14417/14417709.png' />

            </li>
            <li>
              <img alt='google' src='https://www.shareicon.net/data/2016/03/09/731008_logo_512x512.png' />

            </li>
            <li>
              <img alt='instagram' src='https://cdn-icons-png.flaticon.com/512/1400/1400829.png' />

            </li>
            <li>
              <img alt='linkedIn' src='https://cdn-icons-png.flaticon.com/512/3536/3536569.png' />
            </li>
            <li>
              <img alt='github' src='https://cdn-icons-png.flaticon.com/512/25/25657.png' />
            </li>
          </ul>
        </div>
        <div className='location'>
          <div className='company'>
            <h6>
              Money Control
            </h6>
            <p>
              This website is not the orignal Money control nither it aims to achive any monetary benifit its just a website for showcasing purpose.
            </p>
          </div>
          <div className='products'>
            <h6>
              Products
            </h6>
            <ul>
              <li>
                Sales Expertise
              </li>
              <li>
                Personal Manager
              </li>
              <li>
                Investors Contract
              </li>
              <li>
                Dark Rooms
              </li>
            </ul>
          </div>
          <div className='usefullLinks'>
            <h6>
              Useful Links
            </h6>
            <ul>
              <li>
                <Link to={"/signup"}>Sign In</Link>
              </li>
              <li>
                <Link to={"/login"}>Log In</Link>
              </li>
              <li>
                <Link to={"/"}>About</Link>
              </li>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
            </ul>
          </div>
          <div className='contracts'>
            <h6>
              Contract
            </h6>
            <ul>
              <li>
                <img alt='home' src='https://cdn-icons-png.flaticon.com/512/1946/1946436.png' />
                India,Kolkata 727209 IN
              </li>
              <li>
                <img alt='email' src='https://cdn-icons-png.flaticon.com/512/542/542689.png' />
                Tejashsharan2022@gmail.com
              </li>
              <li>
                <img alt='call' src='https://cdn-icons-png.flaticon.com/512/483/483947.png' />
                +91 930 4104269
              </li>
              <li>
                <img alt='fax' src='https://cdn-icons-png.flaticon.com/512/446/446991.png' />
                +91 930 4104269
              </li>
            </ul>
          </div>
        </div>
        <div className='copyright'>
          ©2022 Copyright : <h3>Money_Control</h3>
        </div>
      </section>

    </div>
  )
}

export default Home
