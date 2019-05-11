import React from 'react';
import PropTypes from 'prop-types';
import { handleDialog } from '../../actions/app';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.css';

/**
 * @name Dialog
 * @function 
 * @returns {JSX}
 * @description Menu control
 * @param {string} hoverText Text to display on mouseover
 * @param {string} [icon="cog"|"edit"|"save"|"sync"] Icon to display inside the button
 * @param {function} onClick Function to execute on click
 */
const Dialog = props => {

    /**
     * @name handleAccept
     * @constant
     * @function
     * @description Handles when the user accepts the dialog
     */
    const handleAccept = () => {
        props.handleDialog();
        props.onAccept();
    },
    /**
     * @name handleCancel
     * @constant
     * @function
     * @description Handles when the user cancels the dialog
     */
    handleCancel = () => {
        props.handleDialog();
        props.onCancel();
    };

    return (
        <dialog open={ ( props.open === props.id ) } data-id={ props.id }>
            <form>
                <div>{ props.children }</div>
                <div className="controls" >
                    <button type="button" className="close" onClick={ handleCancel }>
                        <i className="fas fa-2x fa-ban" />
                        Cancel
                    </button>
                    <button type="button" className="accept" onClick={ handleAccept }>
                        <i className="fas blue fa-2x fa-check" />
                        Accept
                    </button>
                </div>
            </form>
        </dialog>
    );
};

Dialog.defaultProps = {
    onAccept: () => {},
    onCancel: () => {},
    open: null
}

Dialog.propTypes = {
    handleDialog: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func,
    open: PropTypes.string
};

const mapStateToProps = state => ({ 
    open: state.app.openDialog
});

const mapDispatchToProps = dispatch => bindActionCreators({ handleDialog }, dispatch );

export default connect( mapStateToProps, mapDispatchToProps )( Dialog );