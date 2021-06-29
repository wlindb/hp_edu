import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ProgressCard from '../ProgressCard/ProgressCard';
import { setSubCategory, getSubCategoryExercises } from '../../actions/exerciseActions';


export const SubCategoriesPage = ({ exercise, setSubCategory, getSubCategoryExercises, history, ...props}) => {
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        if(exercise.section === "kvant") {
            const category_object =  exercise.exercises_meta.quant.find(item => item._id === exercise.category);
            setSubCategories(category_object.sub_category)
        } else {
            const category_object =  exercise.exercises_meta.verb.filter(item => item._id === exercise.category);
            setSubCategories(category_object.sub_category)
        }
        console.log('useEffect subCategories: ', subCategories)
    }, [])

    const handleCardClicked = async (category, sub_category) => {
        console.log('subcategory handleCardClicked: ', category, sub_category);
        setSubCategory(sub_category); 
        await getSubCategoryExercises(category, sub_category);
        history.push(`/exercises/${exercise.section}/${category.toLowerCase()}/${sub_category.toLowerCase()}`);
    }; 

    return (
        <div className="dashboard-container">
            <div className="my-tracks">
                <div className="v2-section-header">
                    <h2 className="ui-header">{props.match.params.subcategory.toUpperCase()}</h2>
                </div>
                <div className="tracks-row">
                    {subCategories.map((e, i) => {
                        const card_title = e.name; // Ekvationer, Ekvationssystem, etc...
                        return <ProgressCard
                                        key={i}
                                        title={card_title}
                                        link={`/exercises/${exercise.section}/${exercise.category}/${card_title.toLowerCase()}`}
                                        active={false}
                                        nrSolvedExercises={e.user_amount}
                                        totalNrOfExercises={e.amount}
                                        onCardClicked={(e) => {e.preventDefault(); handleCardClicked(exercise.category, card_title)}}
                                    />
                    })}
                </div>
            </div>
        </div>
    )
}

SubCategoriesPage.propTypes = {
    exercise: PropTypes.object.isRequired,
    setSubCategory: PropTypes.func.isRequired,
    getSubCategoryExercises: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    exercise: state.exercise,

});

export default connect(
    mapStateToProps,
    { setSubCategory, getSubCategoryExercises }
)(SubCategoriesPage)