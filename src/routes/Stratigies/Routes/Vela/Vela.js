import DefaultLayout from "../../../../components/DefaultLayout"
import ComingSoonSimpleCard from "../../../../components/ComingSoonSimpleCard"

const VelaContent = () => {
  return (
    <>
      <ComingSoonSimpleCard />
    </>
  )
}

const Vela = () => {
  return (
    <DefaultLayout component={<VelaContent />} />
  )
}

export default Vela
