import React from 'react';
import './Markdown.scss';

class Markdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            content: [],
            location:  window.location.pathname,
            fileName: window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
        };
    }
    
    componentDidMount() {
        fetch(this.state.location)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    content: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    render () {
        const tableLines = this.state.isLoaded && this.state.content.map((item, index) => {

            return (
                <tr key={'line' + index}>
                    <td className="file-line__number">{index}</td>
                    <td className="file-line__code">
                        <span><pre>{item}</pre></span>
                    </td>
                </tr>
            )
        })

        return (
            <div className="markdown ">
                <div className="markdown__header">
                    <div className="markdown__title ">
                    <span className="icon icon_markdown icon_margin_right " />
                    {this.state.fileName}
                    </div>
                </div>
                <div className="markdown__content markdown__content_text">
                    <table className="file-line">
                        <tbody>
                            {tableLines}
                        </tbody> 
                    </table>
                </div>
            </div>
        )
    }
    
}

export default Markdown;