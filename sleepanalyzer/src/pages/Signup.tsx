// import React, { useContext, useState } from 'react';
// // import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
// import { RiGoogleLine } from "react-icons/ri";

// import useMediaQuery from '@/hooks/useMediaQuery';
// import CustomButtom from '@/components/CustomButton';
// import CustomInput from '@/components/CustomInput';
// import { UserSignup } from '@/types/interface';
// import { AuthContext } from '@/components/AuthProvider';
// import { useNavigate } from 'react-router';
// import CustomButton from '@/components/CustomButton';

// type Props = {};

// const initialUser: UserSignup = {
//   email: "",
//   password: "",
//   confirmPassword: "",
//   displayName: "",
// };

// const Signup = (props: Props) => {

//     /* change flex direction of section if screen size is too small */
//     const aboveMediumScreen = useMediaQuery("(min-width: 1060px)");
//     const flexDirection = aboveMediumScreen ? "flex-row" : "flex-col";

//     const [userInfo, setUserInfo] = useState(initialUser);
//     // disable button to prevent multiple users from being created
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const {googleSignIn, signUp} = useContext(AuthContext);
//     const navigate = useNavigate();

//     // handling login
//     const handleGoogleSignin = async(e: React.MouseEvent<HTMLElement>) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             await googleSignIn();
//             console.log("User Info Google: ", userInfo);
//             navigate("/profile");
//         } catch(error) {
//             if (typeof error === "object" && 
//                 error && "message" in error &&
//                 typeof error.message === "string"
//             ) {
//                 // message gets narrowed to string!
//                 setError(error.message)
//                 console.log(error);
//             };
//         }
//     }

//     const handleSubmit = async(e: React.MouseEvent<HTMLElement>) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             if (userInfo.password !== userInfo.confirmPassword) {
//                 setLoading(false);
//                 return setError("Passwords MUST match. Please confirm your password again.")
//             }
//             setLoading(true);
//             await signUp(userInfo);
//             setUserInfo(userInfo);
//             navigate("/profile");
//             console.log("User Info: ", userInfo)
//         } catch(error) {
//             if (typeof error === "object" && 
//               error && "message" in error &&
//               typeof error.message === "string"
//             ) {
//                 // message gets narrowed to string!
//                 setError(error.message);
//             };
//         }
//         setLoading(false);
//     }
    
//     // signup page content
//     return (
//         <section 
//           className={`h-screen
//                       flex
//                       ${flexDirection}
//                       justify-center
//                       items-center
//                       text-center
//                       font-main
//                     text-white
//                       p-15`}
//           id="login"
//         >
//             <div 
//               className="border-2 
//                       border-white 
//                         p-5 
//                         w-[30rem] 
//                         backdrop-blur-xl 
//                         bg-transparent
//                         rounded-3xl">
//                 <form 
//                   className="flex 
//                             flex-col 
//                             justify-center 
//                             items-center 
//                             gap-3 
//                             p-5"
//                 >
//                     <h1 className="text-3xl"> 
//                         Signup 
//                     </h1>
//                     <h2 className="text-2xl"> 
//                         Hi there! Let's start your journey with us. 
//                     </h2>
//                     <div className="w-full">
//                         <CustomInput  
//                           type="string" 
//                           placeholder="Name"
//                           value={userInfo.displayName} 
//                           title="name" 
//                           onChange={(e) => 
//                               setUserInfo({ ...userInfo, displayName: e.target.value})
//                           }
//                         />
//                     </div>
//                     <div className="w-full">
//                         <CustomInput  
//                           type="email" 
//                           placeholder="Email"
//                           value={userInfo.email} 
//                           title="Email" 
//                           onChange={(e) => 
//                               setUserInfo({ ...userInfo, email: e.target.value})
//                           }
//                         />
//                         {/* <EnvelopeIcon className="w-6 text-white absolute right-25 top-1/3 translate-y-2 translate-3" /> */}
//                     </div>
//                     <div className="w-full">
//                         <CustomInput  
//                           type="password" 
//                           value={userInfo.password} 
//                           placeholder="Password" 
//                           title="password" 
//                           onChange={(e) => 
//                               setUserInfo({ ...userInfo, password: e.target.value})
//                           }
//                         />
//                         {/* <LockClosedIcon className=" w-6 text-white absolute right-22 bottom-1/2 translate-y-2"/> */}
//                     </div>
//                     <div className="w-full">
//                         <CustomInput  
//                           type="password" 
//                           value={userInfo.confirmPassword}
//                           placeholder="Confirm Password" 
//                           title="password" 
//                           onChange={(e) => 
//                               setUserInfo({ ...userInfo, confirmPassword: e.target.value})
//                           }
//                         />
//                         {/* <LockClosedIcon className=" w-6 text-white absolute right-22 bottom-1/2 translate-y-20"/> */}
//                     </div>
//                     <CustomButton 
//                       onClick={handleSubmit}
//                       customization="w-5/6"
//                       disabled={loading}
//                     >
//                         Sign Up
//                     </CustomButton>
//                     <CustomButton 
//                       page="login"
//                       customization="w-5/6"
//                     >
//                         Login
//                     </CustomButton>

//                     {/* printing the error if an error is returned */}
//                     {
//                       error &&
//                       <div className="error text-zinc-900">
//                         {error}
//                       </div>
//                     }
                    
//                     <div className="gap-5 flex flex-col">
//                         <div>
//                             <hr className="border-t-2 border-white"/>
//                             <p> OR </p>
//                             <hr className="border-t-2 border-white"/>
//                         </div>
//                         <div className="social-icons">
//                             <button className="border-2 border-white rounded-xl p-2" onClick={handleGoogleSignin} disabled={loading}>
//                               <RiGoogleLine/>
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </section>
//     );

// };

// export default Signup;