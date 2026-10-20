
import Button from './components/Button'
import PlusIcons from './icons/PlusIcons'
import ShareIcon from './icons/ShareIcon'

function App() {


  return (
     <div>

      <Button variant='primary' text='Add content' startIcon={<PlusIcons/>}/>
      <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon/>}/>
     </div>
  )
}

export default App
