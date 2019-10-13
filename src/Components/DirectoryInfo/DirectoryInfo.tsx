import React from 'react';
import arrow from './../../images/arrow.svg';
import './DirectoryInfo.scss';

function DirectoryInfo() {
    return (
        <div className="directory-info ">
			<div className="directory-name ">
				<span className="directory-name__main ">arcanum</span>
				<div className="directory-name__branch ">
					<span className="directory-name__branch-name ">
						trunk
						<img className="icon-arrow icon_margin_left icon_margin_top " src={arrow} alt="arrow"/>
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