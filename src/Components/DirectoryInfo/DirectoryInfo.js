import React from 'react';
// import logo from './logo.svg';
import './DirectoryInfo.scss';

function DirectoryInfo() {
    return (
        <div className="directory-info ">
		<div className="directory-name ">
			<span className="directory-name__main ">arcanum</span>
			<div className="directory-name__branch ">
			<span className="directory-name__branch-name ">
				trunk
				<svg
				className="icon-arrow icon_margin_left icon_margin_top"
				xmlns="http://www.w3.org/2000/svg"
				width={10}
				height={6}
				viewBox="0 0 10 6"
				fill="none"
				>
				<path
					d="M5.12891 5.26562C5.26562 5.40234 5.45703 5.40234 5.59375 5.26562L9.64062 1.24609C9.77734 1.13672 9.77734 0.917969 9.64062 0.78125L9.09375 0.261719C8.98438 0.125 8.76562 0.125 8.62891 0.261719L5.375 3.48828L2.09375 0.261719C1.95703 0.125 1.76562 0.125 1.62891 0.261719L1.08203 0.78125C0.945312 0.917969 0.945312 1.13672 1.08203 1.24609L5.12891 5.26562Z"
					fill="#7F8285"
				/>
				</svg>
			</span>
			<div className="select-branch ">
				<div className="select-branch__option select-branch__option_selected ">
				<p className="select-branch__name ">Trunk</p>
				<p className="select-branch__last-commit-date ">
					Last commit 4 s ago
				</p>
				</div>
				<div className="select-branch__scrolled-container ">
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-43865
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit 1 min ago
					</p>
				</div>
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-37948
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit at 16:25
					</p>
				</div>
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-94877
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit yesterday, 14:50
					</p>
				</div>
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-87450
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit on Jan 11, 12:01
					</p>
				</div>
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-27073
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit on Dec 29, 2017
					</p>
				</div>
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-94877
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit yesterday, 14:50
					</p>
				</div>
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-87450
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit on Jan 11, 12:01
					</p>
				</div>
				<div className="select-branch__option ">
					<p className="select-branch__name ">
					users/rudskoy/DEVTOOLS-27073
					</p>
					<p className="select-branch__last-commit-date ">
					Last commit on Dec 29, 2017
					</p>
				</div>
				</div>
			</div>
			</div>
		</div>
		<p className="directory-last-commit ">
			Last commit{" "}
			<span className="directory-last-commit__hash ">r3248813</span> on{" "}
			<span className="directory-last-commit__date ">20 Oct 2017, 12:24</span>{" "}
			by{" "}
			<span className="directory-last-commit__committer ">
			<span>robot-srch-releaser</span>
			</span>
		</p>
		</div>
		
    )
}

export default DirectoryInfo;