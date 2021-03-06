import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {            // formProps comes from reduxFrom object "form" defined at bottom//destructrinf of formProps to input
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className} >
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)
                }
            </div>
        );
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};
// const mapStateToProps = (state) => {
//     return {state:}
// }

export default reduxForm({
    form: 'streamForm',
    validate: validate           //in ES6 if both key value pair same we can only define single value Ex. validate:validate as validate.
})(StreamForm);

