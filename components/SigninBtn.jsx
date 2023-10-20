import { signIn, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

export function SigninBtn() {

  const [providers, setProviders] = useState(null);
  
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
      console.log(response);
    };

    fetchProviders();
  }, []);

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            type="button"
            className="black_btn"
            onClick={() => {
              signIn(provider.id);
            }}
          >
            Sign In
          </button>
        ))}
    </>
  );
}
