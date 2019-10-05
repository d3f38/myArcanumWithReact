import React from 'react';
// import logo from './logo.svg';
import './Markdown.scss';

function Markdown() {
    return (
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
    )
}

export default Markdown;