import { useState, useEffect } from "react";
// import "./main.scss";
import "./App.css";
// import mainStyles from "./main.scss";

useState; //THIS IS FROM PORTFOLIO ON CONDITIONAL RENDERING AND FETCH CALLS
// !----------------------------------------------------------------------------------------
// !----------------------------------------------------------------------------------------
// !----------------------------------------------------------------------------------------
// !----------------------------------------------------------------------------------------
// // !----------------------------------------------------------------------------------------
// interface Post {
//   body: string;
//   createdAt: string;
//   title: string;
//   id: string;
//   slug: string;
//   updatedAt: string;
//   heroImage: HeroImage;
// }

// export function Blog() {
//   const [data, setData] = useState([]);
//   const apiUrl = `${import.meta.env.VITE_HYGRAPH_FAST_ENDPOINT}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             "query": "query here",
//           }),
//         });

//         const result = await response.json();
//         setData(result.data.blogPosts);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col">

//       <div className="align-items-center mb-6 flex flex-col">
//         <div className="flex flex-col gap-4">
//           {data &&
//             data.map((post: Post) => (
//               <Link href={`/blog/${post.slug}`}>
//                 <div className="card flex min-w-full items-center justify-between gap-3 rounded-xl border-2 border-transparent p-2">
//                   {/* {post.heroImage ? (
//                 <>
//                 <p className="splashTitle text-3xl font-semibold">
//                 {post.title}
//                 </p>
//                 <img
//                 src={post.heroImage.url}
//                 alt={post.title}
//                 className="cardSplash"
//                 />
//                 <img
//                 src={post.heroImage.url}
//                 alt={post.title}
//                 className="w-30 h-20"
//                 />
//                 </>
//               ) : null} */}
//                   <h3 className=" justify-self-center text-xl font-semibold">
//                     {/* <Link
//                   href={`/blog/${post.slug}`}
//                   > */}
//                     {post.title}
//                     {/* </Link> */}
//                   </h3>
//                   <p className="justify-self-end italic">
//                     {new Date(post.createdAt).toLocaleDateString("en-gb", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//         </div>
//       </div>

//     </div>
//   );
// }

// !----------------------------------------------------------------------------------------
// !----------------------------------------------------------------------------------------
// !----------------------------------------------------------------------------------------
// !----------------------------------------------------------------------------------------
// !----------------------------------------------------------------------------------------

function App() {
  const [loginStatus, setloginStatus] = useState(false); // to track if it's logged in, and therefore whether the button is there
  const [authToken, setAuthToken] = useState(null); // auth token that will be used in requests and put into localstorage
  // const [data, setData] = useState(null) // for the initial load data?, or do I separate it into the individual sections?
  authToken;

  // Clear local storage on initial load
  localStorage.removeItem("localAuthToken");

  useEffect(() => {
    const fetchAuthToken = async () => {
      const urlParams = new URL(document.location.toString()).searchParams;
      const apiKey = `${import.meta.env.VITE_BUNGIE_API_KEY}`;
      const authCode = urlParams.get("code");
      if (authCode) {
        console.log("🚀 ~ authCode:", authCode);
        const data = `client_id=${import.meta.env.VITE_OAUTH_CLIENT_ID}&grant_type=authorization_code&code=${authCode}`;
        try {
          const authTokenResponse = await fetch(
            "https://www.bungie.net/Platform/App/OAuth/Token/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-API-Key": apiKey,
              },
              body: data,
            },
          );

          const authTokenResult = await authTokenResponse.json();
          if (!authTokenResult.error) {
            console.log(
              "🚀 ~ fetchAuthToken ~ authTokenResult:",
              authTokenResult,
            );
            localStorage.setItem(
              "localAuthToken",
              JSON.stringify(authTokenResult),
            );
            setAuthToken(authTokenResult);

            try {
              const userDataResponse = await fetch(
                "https://www.bungie.net/Platform/User/GetCurrentBungieNetUser/",
                {
                  method: "GET",
                  headers: {
                    "X-API-Key": apiKey,
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("localAuthToken")!).access_token}`,
                  },
                  body: null,
                },
              );

              setloginStatus(true);
              const userDataResult = await userDataResponse.json();
              console.log(
                "🚀 ~ fetchAuthToken ~ userDataResult:",
                userDataResult,
              );
              document.getElementsByClassName("username")[0].innerHTML =
                userDataResult.Response.uniqueName;
            } catch (err) {
              console.error("Error fetching user data:", err);
            }
          }
        } catch (error) {
          console.error("Error fetching auth token:", error);
        }
      }
      setTimeout(
        () => {
          // fetchAuthToken()
          window.location.href = `${import.meta.env.VITE_AUTHORISATION_URL}`;
        },
        1000 * 60 * 60,
      );
    };

    fetchAuthToken();
  }, []);

  return (
    <>
      <div className="header">
        <div className="logoname five">
          {/* <p className='three'>Di<span className='threel'>VA</span></p> */}
          {/* <p className='five'>DiVA</p> */}
          {/* <p className='six'>Di<span className='sixl'>VA</span></p> */}
          DiVA
        </div>

        {loginStatus ? (
          <p className="username">Username Placeholder {loginStatus}</p>
        ) : (
          <a href={import.meta.env.VITE_AUTHORISATION_URL}>
            <button className="loginBtn">Login</button>
            {/* Login */}
          </a>
        )}
        {/* <button className='loginBtn'>Login</button> */}
      </div>

      <div className="content">Character items here. Also inventory below.</div>
      {/* { loginStatus ?
    <p>{loginStatus}</p>: null} */}
    </>
  );
}

export default App;
