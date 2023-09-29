import { ImStatsBars, ImStatsDots } from 'react-icons/im'

function Nav() {
    return  <header className='container max-w-2xl px-6 mx-auto'>
    <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="h-[20px] w-[20px] rounded-full overflow-hidden">
        <img 
          className="object-cover w-full h-full"
          src="https://ciclovivo.com.br/wp-content/uploads/2018/10/iStock-536613027.jpg" 
          alt="Profile image"
        />
      </div>
      <small>Eai, Luann</small>
    </div>
    <nav className="flex items-center gap-5">
      <div>
        <ImStatsBars className="text-2xl"/>
      </div>
      <div>
        <button className="btn btn-danger">Sign out</button>
      </div>
    </nav>
    </div>
  </header>
};

export default Nav;