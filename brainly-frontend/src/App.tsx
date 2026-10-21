
import Button from './components/Button'
import Card from './components/Card'
import PlusIcons from './icons/PlusIcons'
import ShareIcon from './icons/ShareIcon'

function App() {


  return (
     <div className= "p-4 ">

      <div className= "flex justify-end gap-4">
         <Button variant='primary' text='Add content' startIcon={<PlusIcons/>}/>
         <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon/>}/>
      </div>

     


      <div className= "flex gap-4">
        <Card type="youtube" link="https://www.youtube.com/embed/lweDf3_q-sk?si=2xxSwCrdgbGAFfs9" title="Advance Backend Development"/>
       <Card type="twitter" link="https://x.com/tnn_y11/status/2112626421113946568" title="My First  Tweet"/>


      </div>
     </div>
  )
}

export default App
