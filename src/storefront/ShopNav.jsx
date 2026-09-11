"use client";

/**
 * Shared Devert Store navbar for all shop routes.
 * Links use Next.js paths (no .html).
 */
export default function ShopNav() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <a className="nav-links" href="/">
            Home
          </a>
        </li>

        <li className="has-dropdown">
          <a className="nav-links" href="#">
            Shop
          </a>
          <ul className="dropdown">
            <li>
              <a href="/bottega">Bottega Veneta Andiamo</a>
            </li>
            <li>
              <a href="/burberry">Burberry</a>
            </li>
            <li>
              <a href="/cartier">Cartier</a>
            </li>
            <li>
              <a href="/chanel">Chanel</a>
            </li>
            <li>
              <a href="/coach">Coach</a>
            </li>
            <li>
              <a href="/dior">Dior</a>
            </li>
            <li>
              <a href="/fendi">Fendi</a>
            </li>
            <li>
              <a href="/gucci">Gucci</a>
            </li>
            <li>
              <a href="/katespade">Kate Spade</a>
            </li>
            <li>
              <a href="/louis">Louis Vuitton</a>
            </li>
            <li>
              <a href="/prada">Prada</a>
            </li>
          </ul>
        </li>

        <li className="has-dropdown">
          <a className="nav-links" href="#">
            Purses
          </a>
          <ul className="dropdown">
            <li>
              <a href="/diorpurses">Dior</a>
            </li>
            <li>
              <a href="/fendipurses">Fendi</a>
            </li>
            <li>
              <a href="/bottegapurses">Bottega Veneta Andiamo</a>
            </li>
          </ul>
        </li>

        <li className="has-dropdown">
          <a className="nav-links" href="#">
            Shoes
          </a>
          <ul className="dropdown">
            <li>
              <a href="/guccishoes">Gucci</a>
            </li>
            <li>
              <a href="/fendishoes">Fendi</a>
            </li>
            <li>
              <a href="/katespadeshoes">Kate Spade</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          <a className="nav-links" href="/login">
            Admin
          </a>
        </li>
        <li>
          <a
            className="nav-links"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("toggleContact"));
            }}
          >
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
  );
}
