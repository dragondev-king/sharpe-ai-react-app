import DefaultLayout from "../../../../components/DefaultLayout"
import ComingSoonSimpleCard from "../../../../components/ComingSoonSimpleCard"

const HeliosContent = () => {
  return (
    <>
      
      <ComingSoonSimpleCard />
    </>
  )
}

const Helios = () => {
  return (
    <DefaultLayout component={<HeliosContent />} />
  )
}

export default Helios
