
import Button from './components/Button'
import PlusIcons from './icons/PlusIcons'
import ShareIcon from './icons/ShareIcon'

function App() {


  return (
    <>

      <Button
        variant="primary"
        startIcon={<PlusIcons size={"lg"} />}
        size="lg"
        text="Add Content"
        
      />

      <Button
        variant="secondary"
        endIcon={<ShareIcon size="lg" />}
        size="lg"
        text="Share"
        
      />


    </>
  )
}

export default App
