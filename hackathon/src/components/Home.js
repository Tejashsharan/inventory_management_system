import React, { useState, useEffect, useRef } from 'react'

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
        <section className={`heading`}>
          <h1 style={{ color: "black" }}>Welcome to </h1>
          <h1 style={{color:'green'}}>MoneyControl</h1>
          <div className='wrapper'>
            <div className='static-txt'> We helps in mangeing</div>
            <ul className='dynamic-txt'>
              <li><span>Inventories</span></li>
              <li><span>Taxes</span></li>
              <li><span>Stats</span></li>
              <li><span>Transactions</span></li>
            </ul>
          </div>
          <p style={{ color: 'black', padding: "20px", fontSize: "16px" }}>Hello , welcome to the world's best Inventory manangement system here we will provide you some of the best tools through which you can manage your inverntories without any worries .</p>
        </section>
        <img alt="man" src='https://wallpapercave.com/wp/wp6056688.jpg' style={{ width: "50%", margin: "125px 50px 50px 50px", borderRadius: "12px" }} />
      </section>

      <section className='secondLook'>

        <section className='text'>
          <ul className='movingText' style={{ listStyle: "none" }}>
            <li className='list1'>
              <h3 style={{color:'green'}}>Stats</h3>
              <p >Our system helps manage your stats by providing real-time tracking, detailed analytics, automated reporting, and customizable alerts. This ensures you have accurate, up-to-date information at all times, allowing you to make informed decisions and optimize your inventory management efficiently.</p>
            </li>
            <li className='list2'>
              <h3 style={{color:"green"}}>Transaction Tracking</h3>
              <p>Our system accurately tracks transactions, providing detailed reports and real-time updates to help you monitor sales, purchases, and financial performance seamlessly, enhancing financial transparency and accountability.</p>
            </li>
            <li className='list3'>
              <h3 style={{color:"green"}}>Tax Calculation</h3>
              <p > Our system simplifies tax calculations by automating tax reporting and compliance, ensuring accurate and timely filings with detailed, up-to-date information, reducing errors and saving valuable time.</p>
            </li>
            <li className='list4'>
              <h3 style={{color:'green'}}>Inventory Manangement</h3>
              <p>Our system streamlines inventory management with real-time tracking, automated restocking, detailed analytics, and customizable alerts, ensuring optimal stock levels, efficient operations, and reduced costs.</p>
            </li>
          </ul>
        </section>

        <section className='animation'>
          <section className='animated_images'>
            <div className='image'>
              <img className='image_1' alt='stats' src='https://th.bing.com/th/id/OIP.9qvo5IvxkYxPZF32Dg9dSQHaGN?rs=1&pid=ImgDetMain' style={{ position: "absolute", left: "-15%", top: "20%" }} />

              <img className='image_2' alt="inventory" src='https://www.vedaerp.com/wp-content/uploads/2021/01/inventory-management.png' style={{ position: "absolute", left: "40%", top: "-20%" }} />

              <img className='image_3' alt="taxes" src='https://www.pngmart.com/files/7/Tax-PNG-Photos.png' style={{ position: "absolute", left: "80%", top: "40%" }} />

              <img className='image_4' alt="transaction" src='https://cdn-icons-png.flaticon.com/512/3584/3584670.png' style=
                {{ position: "absolute", left: "20%", top: "80%" }} />

            </div>
          </section>
        </section>

      </section>

      <section ref={sectionRef} className={`thirdLook  ${state}`}>
        <div>
          <h3>User Profiles and Roles</h3>
          <div>
            <p>User Profiles: Create detailed user profiles that include contact information, roles, permissions, and historical activity.
              Role-Based Access Control (RBAC): Assign roles (e.g., admin, manager, staff) with specific permissions to ensure users can access only the necessary information and functionalities.</p>

            <img src='https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Clipart.png' alt='userProfile' height={"100px"} />
          </div>
        </div>
        <div>
          <h3>Inventory Optimization</h3>
          <div>
            <p>Demand Forecasting: Use historical data and predictive analytics to forecast demand and optimize stock levels.
              Safety Stock Calculation: Maintain safety stock to cushion against unexpected demand spikes or supply chain disruptions.</p>

            <img src='https://www.supplymint.com/blogs/wp-content/uploads/2022/05/warehouse-management-software.png' alt='inventoryOpetimisation' height={"100px"} />
          </div>
        </div>
        <div>
          <h3>Sales and Purchases</h3>
          <div>
            <p>Sales Orders: Record and process sales orders, updating inventory levels and generating invoices.
              Purchase Orders: Create and manage purchase orders, track received goods, and update inventory.</p>

            <img src='https://icon-library.com/images/purchase-icon-png/purchase-icon-png-19.jpg' alt='salesAndPurchase' height={"100px"} />
          </div>
        </div>
        <div>
          <h3>Tax Calculation</h3>
          <div>
            <p>Sales Tax: Automatically calculate applicable sales tax based on the product type and customer location.
              Value-Added Tax (VAT): Manage VAT calculations, ensuring compliance with regional tax laws.</p>

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

      <section className='khatam'>
        <div className='name'>
          <img src='https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOoeEF.img?w=44&h=44' alt='logo' />
          <p>MoneyControl</p>
        </div>
        <div className='copy'>
          <p>©️ copyright 2024</p>
        </div>
        <div className='insta'>
          <img src='https://www.freepnglogos.com/uploads/twitter-x-logo-png/twitter-x-logo-png-9.png' alt='twitter' />
          <img src='https://pngimg.com/uploads/github/github_PNG53.png' alt='github' />
        </div>
      </section>

    </div>
  )
}

export default Home
