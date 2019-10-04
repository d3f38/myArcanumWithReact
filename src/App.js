import React from 'react';
import './App.scss';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="theme-repository ">
      <Header />
      
      <div className="main-content main-content_repository">
        <div className="breadcrumbs ">
          <a href="# " className="breadcrumbs__link ">
            arcania
          </a>
          <a href="# " className="breadcrumbs__link ">
            arcadia
          </a>
          <a href="# " className="breadcrumbs__link ">
            blob
          </a>
          <a href="# " className="breadcrumbs__link ">
            tree
          </a>
          <a href="# " className="breadcrumbs__link ">
            commit
          </a>
          <a href="# " className="breadcrumbs__link ">
            hash
          </a>
        </div>
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
        <div className="directory-content ">
          <div className="directory-content-tabs ">
            <span className="directory-content-tabs__tab directory-content-tabs__tab_active ">
              files
            </span>
            <span className="directory-content-tabs__tab ">branches</span>
          </div>
          <div className="directory-content-details ">
            <div className="directory-content-details__item directory-content-details__item_header ">
              <div className="directory-content-details__name ">Name</div>
              <div className="directory-content-details__last-commit ">
                Last commit
              </div>
              <div className="directory-content-details__commit-message ">
                Commit message
              </div>
              <div className="directory-content-details__committer ">Committer</div>
              <div className="directory-content-details__date ">Updated</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> api
              </div>
              <div className="directory-content-details__last-commit ">d53dsv</div>
              <div className="directory-content-details__commit-message ">
                [vcs] move http to arc
              </div>
              <div className="directory-content-details__committer ">
                <span>noxoomo</span>
              </div>
              <div className="directory-content-details__date ">4 s ago</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> ci
              </div>
              <div className="directory-content-details__last-commit ">c53dsv</div>
              <div className="directory-content-details__commit-message ">
                [vcs] test for empty commit message
              </div>
              <div className="directory-content-details__committer ">
                <span>nikitxskv</span>
              </div>
              <div className="directory-content-details__date ">1 min ago</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> contrib
              </div>
              <div className="directory-content-details__last-commit ">s53dsv</div>
              <div className="directory-content-details__commit-message ">
                [vcs] change owner to g:arc
              </div>
              <div className="directory-content-details__committer ">
                <span>nalpp</span>
              </div>
              <div className="directory-content-details__date ">16:25</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> http
              </div>
              <div className="directory-content-details__last-commit ">h5jdsv</div>
              <div className="directory-content-details__commit-message ">
                [vcs] move http to arc
              </div>
              <div className="directory-content-details__committer ">
                <span>somov</span>
              </div>
              <div className="directory-content-details__date ">
                Yesterday, 14:50
              </div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> lib
              </div>
              <div className="directory-content-details__last-commit ">f5jdsv</div>
              <div className="directory-content-details__commit-message ">
                ARCADIA-771: append /trunk/arcadia/
              </div>
              <div className="directory-content-details__committer ">
                <span>deshevoy</span>
              </div>
              <div className="directory-content-details__date ">Jan 11, 12:01</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> local
              </div>
              <div className="directory-content-details__last-commit ">k5jdsv</div>
              <div className="directory-content-details__commit-message ">
                ARCADIA:771: detect binary files
              </div>
              <div className="directory-content-details__committer ">
                <span>exprmntr</span>
              </div>
              <div className="directory-content-details__date ">Jan 11, 12:01</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> packages
              </div>
              <div className="directory-content-details__last-commit ">a5jdsv</div>
              <div className="directory-content-details__commit-message ">
                [vcs] VCS-803: packages for services
              </div>
              <div className="directory-content-details__committer ">
                <span>levanov</span>
              </div>
              <div className="directory-content-details__date ">Jan 1, 12:01</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> robots
              </div>
              <div className="directory-content-details__last-commit ">l5jdsv</div>
              <div className="directory-content-details__commit-message ">
                ARCADIA-771: convert string to json object
              </div>
              <div className="directory-content-details__committer ">
                <span>torkve</span>
              </div>
              <div className="directory-content-details__date ">Dec 29, 2017</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> server
              </div>
              <div className="directory-content-details__last-commit ">l5jdsv</div>
              <div className="directory-content-details__commit-message ">
                [vcs] get list of refs
              </div>
              <div className="directory-content-details__committer ">
                <span>torkve</span>
              </div>
              <div className="directory-content-details__date ">Dec 29, 2017</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_folder icon_margin_right " /> ut
              </div>
              <div className="directory-content-details__last-commit ">l5jdsv</div>
              <div className="directory-content-details__commit-message ">
                [vsc] store merge conflicts
              </div>
              <div className="directory-content-details__committer ">
                <span>torkve</span>
              </div>
              <div className="directory-content-details__date ">Dec 29, 2017</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_markdown icon_margin_right" /> README.md
              </div>
              <div className="directory-content-details__last-commit ">h5jdsl</div>
              <div className="directory-content-details__commit-message ">
                [vcs] add readme
              </div>
              <div className="directory-content-details__committer ">
                <span>pg</span>
              </div>
              <div className="directory-content-details__date ">Dec 29, 2017</div>
            </div>
            <div className="directory-content-details__item ">
              <div className="directory-content-details__name ">
                <span className="icon icon_script icon_margin_right " /> ya.make
              </div>
              <div className="directory-content-details__last-commit ">k5jdsv</div>
              <div className="directory-content-details__commit-message ">
                [vcs] move http to arc
              </div>
              <div className="directory-content-details__committer ">
                <span>mvel</span>
              </div>
              <div className="directory-content-details__date ">Dec 29, 2017</div>
            </div>
          </div>
        </div>
        <div className="markdown ">
          <div className="markdown__header">
            <div className="markdown__title ">
              <span className="icon icon_markdown icon_margin_right " />
              README.md
            </div>
          </div>
          <div className="markdown__content markdown__content_text">
            <p className="markdown__h1 ">Плагины и конфиги комбайна</p>
            <p className="markdown__paragraph ">
              Плагины - статически собираются в образ, любая модификация требует
              пересборки образа и перевыкатки сервиса. Перед перевыкаткой нужно не
              забыть поменять layers на новый, версию предыдущего layer можно
              посмотреть в сервисе.
              https://nanny.yandex-team.ru/ui/#/services/dashboards/catalog/combaine/
            </p>
            <p className="markdown__paragraph ">
              Конфиги - деплоятся динамически через deploy-configs.py, который
              запускается по крону на всех комбайнах. Скрипт generator.py и
              deploy-configs.py деплоятся динамически вместе с конфигами. Каталог
              configs poll-ится на измененние svn ревизии раз в минуту, поэтому
              задержка деплоя конфигов в комбайн должна быть не больше минуты с
              момента мерджа в транк.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
