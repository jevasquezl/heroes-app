import { useEffect } from "react";
import { useSearchParams } from "react-router";

const valor = "MI-PARAMETRO";

export const AdminPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const parametro = searchParams.get('parametro') ?? 'All';

  useEffect(() => {
    setSearchParams(
      (prev) => {
        prev.set("parametro", valor);
        return prev;
      });
  }, [])

  console.log(parametro);

  return <div>AdminPage</div>;
};


export default AdminPage;