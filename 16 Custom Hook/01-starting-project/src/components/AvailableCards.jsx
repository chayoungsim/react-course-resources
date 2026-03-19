import { useAxios } from "../hooks/useAxios";
import Cards from "./Cards";

const AvailableCards = () => {
  const { data, loading, error } = useAxios(`/places`);
  return (
    <div>        
        <Cards title="Available Places" data={data} loading={loading} error={error} />        
    </div>
  )
}

export default AvailableCards