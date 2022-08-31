import React ,{useState,useRef} from "react";
import styles from './register.module.css';
import SvgLogin from './SvgRegister';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from 'axios';
function Register(){
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const confirmPssword=useRef();
    const navigate=useNavigate();
    const handleClick=async(e)=>{
        e.preventDefault();
        if(confirmPssword.current.value!==password.current.value){
            confirmPssword.current.setCustomValidity('passowrds are not the same')
        }else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try{
                const user1= await axios.post('auth/register',user)
                navigate('/login')
            }catch(err){
                console.log(err)
            }
        }
    }
    return (
        <div className={styles.containerLogin}>
            <div className={styles.wrapper}>
                <div className={styles.leftWrapper}>
                    <SvgLogin/>
                    <Link to={'/login'}>
                        <h3 className={styles.createAccount}>to Log in</h3>
                    </Link>
                </div>
                <div className={styles.rightWrapper}>
                    <h1 className={styles.signup}>Log In</h1>
                    <form onSubmit={handleClick} className={styles.formLogin}>
                        <div>
                            <div className={styles.emailContainer}>
                                <img src="/assets/images/username.png" alt="" className={styles.icons} />
                                <input type="text" name="email" ref={username} 
                                placeholder="User Name" className={styles.inputLogin}/>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div>
                            <div className={styles.emailContainer}>
                                <img src="/assets/images/email.png" alt="" className={styles.icons} />
                                <input type="email" name="email" ref={email} 
                                placeholder="Your Email" className={styles.inputLogin}/>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div>
                            <div className={styles.passwordContainer}>
                                <img src="/assets/images/password.png" alt="" className={styles.icons} />
                                <input type="password" name="password" ref={password} 
                                placeholder="Your Password" className={styles.inputLogin}/>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <div>
                            <div className={styles.passwordContainer}>
                                <img src="/assets/images/password.png" alt="" className={styles.icons} />
                                <input type="password" name="confirmPassword" ref={confirmPssword} 
                                placeholder="Confirme Password" className={styles.inputLogin}/>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                        <button className={styles.submitLogin}>submit</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}
export default Register;