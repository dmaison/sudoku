import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GAME_WIN } from '../../constants/menu'
import Dialog from '../../components/Dialog'
import './style.css'
import './animation.css'

const Win = props => {
    return (
        <Dialog id={ GAME_WIN } acknowledge>
            <h1>
                <i className="fas fa-trophy fa-2x" />
                <i className="fas fa-star fa-2x" />
                <i className="fas fa-star" />
                <i className="fas fa-star fa-lg" />
                <i className="fas fa-star fa-2x" />
                You Won!
            </h1>
            <dl>
                <dt>Difficulty</dt>
                <dd>{ props.difficulty }</dd>
                <dt>Time</dt>
                <dd></dd>
                <dt>Mistakes</dt>
                <dd>{ props.mistakes }</dd>
            </dl>
        </Dialog>
    );
}

Win.propTypes = {
    difficulty: PropTypes.string.isRequired,
    mistakes: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    difficulty: state.app.difficulty,
    mistakes: state.app.mistakes
})

export default connect( mapStateToProps )( Win )