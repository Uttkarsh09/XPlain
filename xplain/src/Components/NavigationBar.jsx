/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { X, Menu } from "react-feather";
import { userInfo } from "./Store/Slices/UserSlice";
import { useSelector } from "react-redux";

function NavigationBar() {
	const navMenuRef = useRef();
	const user = useSelector(userInfo);

	function onCloseClick() {
		navMenuRef.current.classList.remove("open_nav_menu");
	}

	function onToggleClick() {
		navMenuRef.current.classList.add("open_nav_menu");
	}

	return (
		<nav className="nav container">
			<Link to="/" className="nav__logo">
				XPlain
			</Link>

			<div ref={navMenuRef} className="nav__menu" id="nav-menu">
				<ul className="nav__list">
					<li className="nav__items">
						<Link
							to="/"
							onClick={onCloseClick}
							className="nav__link active-link"
						>
							Home
						</Link>
					</li>
					<li className="nav__items">
						<Link
							to="/edit"
							onClick={onCloseClick}
							className="nav__link active-link"
						>
							About
						</Link>
					</li>
					<li className="nav__items">
						<Link
							to="/blogs"
							onClick={onCloseClick}
							className="nav__link active-link"
						>
							Blogs
						</Link>
					</li>
					<li className="nav__items">
						<Link
							to={user.username ? `/userProfile/${user.username}` : "/login"}
							onClick={onCloseClick}
							className="nav__link active-link"
						>
							<img
								src="profile.svg"
								style={{ height: 40, width: 40, borderRadius: "50%" }}
							/>
						</Link>
					</li>
				</ul>

				<X onClick={onCloseClick} className="nav__close" />
			</div>

			<div onClick={onToggleClick} className="nav__toggle">
				<Menu />
			</div>
		</nav>
	);
}

export default NavigationBar;
