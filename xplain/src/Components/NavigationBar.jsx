/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { X, Menu } from "react-feather";
import useUserInfo from "./Hooks/useUserInfo";
import DisplaySvg from "./Utilities/DisplaySvg";
import "../styles/CSS/navigationBar.css";

function NavigationBar() {
	const navMenuRef = useRef();
	const user = useUserInfo();

	function onCloseClick() {
		navMenuRef.current.classList.remove("open_nav_menu");
	}

	function onToggleClick() {
		navMenuRef.current.classList.add("open_nav_menu");
	}

	return (
		<nav className="nav">
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
							to="/blog-library"
							onClick={onCloseClick}
							className="nav__link active-link"
						>
							Blogs
						</Link>
					</li>
					<li className="nav__items">
						<Link
							to="/write"
							onClick={onCloseClick}
							className="nav__link active-link"
						>
							Write
						</Link>
					</li>
					<li className="nav__items">
						<Link
							to={user.username ? `/user-profile/${user.username}` : "/login"}
							onClick={onCloseClick}
							className="nav__link active-link"
						>
							{user.profilePhoto ? (
								<DisplaySvg
									svgString={user.profilePhoto}
									className="profile-photo"
								/>
							) : (
								<img
									src={window.location.origin + "/defaultProfile.png"}
									className="profile-photo"
									style={{ objectFit: "cover", objectPosition: "55% 100%" }}
								/>
							)}
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
