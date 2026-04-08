import { Login } from "../../api/api";

import LogIn from "../../components/Login/Login";

export default function Log_in() {
  const handleSubmit = async (data) => {
    let res;
    res = await Login(data);

    return res;
  };
  return <LogIn onSubmit={handleSubmit} />;
}
