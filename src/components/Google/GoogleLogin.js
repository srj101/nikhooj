import { useRef } from "react";
import useScript from "../../Hooks/useScripts";
import jwt_decode from "jwt-decode";
import store from "../../store";
import { register } from "../../actions/userActions";
export default function GoogleLogin({
  onGoogleSignIn = (response) => {
    const responsePayload = jwt_decode(response.credential);
    store.dispatch(
      register({
        email: responsePayload.email,
        type: "passwordless",
        name: responsePayload.name,
        dp: { url: responsePayload.picture },
      })
    );
  },
  text = "signin_with",
  // feel free to add more options here
}) {
  const googleSignInButton = useRef(null);

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "893641174569-slpat0hj55rtslqnichn690khrr2oogl.apps.googleusercontent.com",
      callback: onGoogleSignIn,
    });
    window.google.accounts.id.renderButton(
      googleSignInButton.current,
      { theme: "outline", size: "large", text, width: "250" } // customization attributes
    );
  });

  return <div className="test" ref={googleSignInButton}></div>;
}
