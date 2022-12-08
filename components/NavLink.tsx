import Link from "next/link"

const NavLink = ({name, route , onClick}:any) =>{ 
    return(
        <Link
        href={`/${route}`}
        className="block py-2 pl-3 pr-2 text-black dark:text-white md:bg-transparent"
        aria-current="page"
        onClick={onClick}
      >
        {name}
      </Link>
    )
}

export default NavLink