import DefaultLayout from "../../components/DefaultLayout"
import ComingSoonSimpleCard from "../../components/ComingSoonSimpleCard"

const IndicesContent = () => {
  return (
    <>
      <ComingSoonSimpleCard />
    </>
  )
}

const Indices = () => {
  return (
    <DefaultLayout component={<IndicesContent />} />
  )
}

export default Indices
