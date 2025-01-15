import React, { Component, ChangeEvent, FormEvent } from "react";
import "../styles/addVotingForm.css";
import { v4 as uuidv4 } from "uuid";

interface Option {
    title: string;
    description: string;
}

interface State {
    id: string;
    title: string;
    description: string;
    options: Option[];
    photo: File | null;
    startDate: string;
    endDate: string;
    isClosed: boolean;
}

class AddVotingForm extends Component<{}, State> {
    state: State = {
        id: uuidv4(),
        title: "",
        description: "",
        options: [{ title: "", description: "" }, { title: "", description: "" }],
        photo: null,
        startDate: "",
        endDate: "",
        isClosed: true,
    };

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
    };

    handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ photo: e.target.files[0] });
        } else {
            this.setState({ photo: null });
        }
    };

    handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as unknown as Pick<State, "startDate" | "endDate">);

        if (name === "startDate") {
            const currentDate = new Date().toISOString().split("T")[0];
            this.setState({ isClosed: value > currentDate });
        }
    };

    handleOptionChange = (index: number, field: "title" | "description", value: string) => {
        const updatedOptions = [...this.state.options];
        updatedOptions[index][field] = value;
        this.setState({ options: updatedOptions });
    };

    handleAddOption = () => {
        this.setState((prevState) => ({
            options: [...prevState.options, { title: "", description: "" }],
        }));
    };

    handleRemoveOption = (index: number) => {
        this.setState((prevState) => {
            const updatedOptions = prevState.options.filter((_, i) => i !== index);
            return {
                options: updatedOptions.length >= 2 ? updatedOptions : prevState.options,
            };
        });
    };

    resetForm = () => {
        this.setState({
            id: uuidv4(),
            title: "",
            description: "",
            options: [{ title: "", description: "" }, { title: "", description: "" }],
            photo: null,
            startDate: "",
            endDate: "",
            isClosed: true,
        });
    };

    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { id, title, description, options, photo, startDate, endDate, isClosed } = this.state;

        if (!title.trim() || !description.trim()) {
            alert("Title and description are required.");
            return;
        }

        const currentDate = new Date().toISOString().split("T")[0];
        if (!startDate || startDate < currentDate) {
            alert("Start date must not be earlier than today.");
            return;
        }

        if (!endDate || endDate <= startDate) {
            alert("End date must be after the start date.");
            return;
        }

        if (options.length < 2) {
            alert("At least 2 options are required.");
            return;
        }

        if (options.some((opt) => !opt.title.trim() || !opt.description.trim())) {
            alert("All options must have a title and description.");
            return;
        }

        if (!photo) {
            alert("Please upload a photo.");
            return;
        }

        const payload = new FormData();
        payload.append("id", id);
        payload.append("title", title);
        payload.append("description", description);
        payload.append("photo", photo);
        payload.append("startDate", startDate);
        payload.append("endDate", endDate);
        payload.append("isClosed", JSON.stringify(isClosed));
        payload.append("options", JSON.stringify(options));

        console.log("Data to be sent:", payload);

        try {
            alert("Form submitted successfully! Check the console for FormData.");
            this.resetForm();
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    render() {
        return (
            <div className="add-voting-form">
                <div className="container">
                    <div className="add-voting-form__container">
                        <form onSubmit={this.handleSubmit} className="add-voting-form__form">
                            <div className="add-voting-form__sections">
                                <div className="add-voting-form__section">
                                    <h2 className="add-voting-form__title">Voting Information</h2>
                                    <div className="add-voting-form__group">
                                        <label htmlFor="title" className="add-voting-form__label">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="add-voting-form__input"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="add-voting-form__group">
                                        <label htmlFor="description" className="add-voting-form__label">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="add-voting-form__input"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="add-voting-form__group">
                                        <label htmlFor="photo" className="add-voting-form__label">Upload Photo</label>
                                        <label className="add-voting-form__button-upload" htmlFor="photo">
                                            {this.state.photo ? "Photo Selected" : "Choose a File"}
                                        </label>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            className="add-voting-form__input-file"
                                            onChange={this.handlePhotoChange}
                                            required
                                        />
                                    </div>
                                    <div className="add-voting-form__group">
                                        <label htmlFor="startDate" className="add-voting-form__label">Start Date</label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            className="add-voting-form__input"
                                            value={this.state.startDate}
                                            onChange={this.handleDateChange}
                                            required
                                        />
                                    </div>
                                    <div className="add-voting-form__group">
                                        <label htmlFor="endDate" className="add-voting-form__label">End Date</label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            className="add-voting-form__input"
                                            value={this.state.endDate}
                                            onChange={this.handleDateChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="add-voting-form__section">
                                    <h2 className="add-voting-form__title">Election Settings</h2>
                                    {this.state.options.map((option, index) => (
                                        <div key={index} className="add-voting-form__option">
                                            <div className="add-voting-form__group">
                                                <label className="add-voting-form__label">Option Title</label>
                                                <input
                                                    type="text"
                                                    className="add-voting-form__input"
                                                    value={option.title}
                                                    onChange={(e) =>
                                                        this.handleOptionChange(index, "title", e.target.value)
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="add-voting-form__group">
                                                <label className="add-voting-form__label">Option Description</label>
                                                <textarea
                                                    className="add-voting-form__input"
                                                    value={option.description}
                                                    onChange={(e) =>
                                                        this.handleOptionChange(index, "description", e.target.value)
                                                    }
                                                    required
                                                ></textarea>
                                            </div>
                                            <button
                                                type="button"
                                                className="add-voting-form__remove-option"
                                                onClick={() => this.handleRemoveOption(index)}
                                            >
                                                Remove Option
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="add-voting-form__add-option"
                                        onClick={this.handleAddOption}
                                    >
                                        + Add Option
                                    </button>
                                </div>
                            </div>
                            <button className="add-voting-form__button-create" type="submit">
                                Create a Poll
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddVotingForm;
