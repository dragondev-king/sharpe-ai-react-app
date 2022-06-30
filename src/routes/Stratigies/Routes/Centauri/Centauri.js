import DefaultLayout from "../../../../components/DefaultLayout"
import ComingSoonSimpleCard from "../../../../components/ComingSoonSimpleCard"

const CentauriContent = () => {
  return (
    <>
      <ComingSoonSimpleCard />
    </>
  )
}

const Centauri = () => {
  return (
    <DefaultLayout component={<CentauriContent />} />
  )
}

export default Centauri
