import { ReactComponent as TwitterIcon } from '../../assets/svgs/twitter.svg'
import { ReactComponent as DiscordIcon } from '../../assets/svgs/discord.svg'
import { ReactComponent as EmailIcon } from '../../assets/svgs/email.svg'
import { ReactComponent as BookIcon } from '../../assets/svgs/book.svg'
import './style.scss'

const SocialIcons = () => {
  return (
    <div className='social-icons'>
      <a href='https://twitter.com/sharpe_ai'>
        <TwitterIcon />
      </a>
      <a href='https://discord.com/invite/tFAvMTw6Hx'>
        <DiscordIcon />
      </a>
      <a href='mailto:hello@sharpe.ai'>
        <EmailIcon />
      </a>
      <a href='https://docs.sharpe.ai/'>
        <BookIcon />
      </a>
    </div>
  )
}

export default SocialIcons
