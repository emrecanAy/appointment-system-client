import React from "react";
import "./style.css";
import { Input } from "antd";

export const SignUp = () => {
  return (
    <div className="sign-up">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="rectangle" />
          <div className="div" />
          <div className="rectangle-2" />
          <div className="element">
            <div className="overlap-group">
              <div className="text-wrapper">Rathod</div>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="div-wrapper">
              <div className="text-wrapper-2">Mobile Number</div>
            </div>
          </div>
          <div className="element-2">
            <div className="div-wrapper">
              <div className="text-wrapper-2">Email Address</div>
            </div>
          </div>
          <div className="element-3">
            <div className="div-wrapper">
              <div className="text-wrapper-2">Password</div>
            </div>
          </div>
          <div className="element-4">
            <div className="div-wrapper">
              <div className="text-wrapper-2">Confirm Password</div>
            </div>
          </div>
          <div className="element-5">
            <div className="overlap-2">
              <div className="text-wrapper-3">Continue</div>
            </div>
          </div>
          <div className="element-6">
            <div className="rectangle-3" />
            <div className="text-wrapper-4">Confirm Password</div>
          </div>
          <div className="element-7">
            <div className="div-wrapper">
              <div className="text-wrapper">VJ</div>
            </div>
          </div>
          <p className="p">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry.
          </p>
          <div className="text-wrapper-5">Set up your account</div>
          <div className="group">
            <p className="already-have-an">
              <span className="span">Already have an account ? </span>
              <span className="text-wrapper-6">Sign in</span>
            </p>
            <img className="akar-icons-arrow" alt="Akar icons arrow" src="akar-icons-arrow-right.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
