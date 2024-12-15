import React, { Component, ChangeEvent, FormEvent } from "react";
import "../styles/addVotingForm.css";

interface Option {
    title: string;
    description: string;
}

interface State {
    title: string;
    description: string;
    options: Option[];
    photo: File | null; // Поле для збереження фото
}

class AddVotingForm extends Component<{}, State> {
    state: State = {
        title: "",
        description: "",
        options: [{ title: "", description: "" }],
        photo: null,
    };

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
    };

    handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({ photo: e.target.files[0] });
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
        this.setState((prevState) => ({
            options: prevState.options.filter((_, i) => i !== index),
        }));
    };

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { title, description, options, photo } = this.state;

        if (!title.trim() || !description.trim()) {
            alert("Title and description are required.");
            return;
        }

        if (!photo) {
            alert("Photo is required.");
            return;
        }

        if (options.length === 0 || options.every((opt) => !opt.title.trim() && !opt.description.trim())) {
            alert("At least one valid option is required.");
            return;
        }

        if (options.some((opt) => !opt.title.trim() || !opt.description.trim())) {
            alert("All options must have a title and description.");
            return;
        }

        const payload = new FormData();
        payload.append("title", title);
        payload.append("description", description);
        payload.append("photo", photo);
        payload.append("options", JSON.stringify(options));

        console.log("Data to be sent:", payload);

        try {
            alert("Form submitted successfully! Check the console for FormData.");
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
                            <div className="add-voting-form__section">
                                <h2 className="add-voting-form__title">Voting Information</h2>
                                <div className="add-voting-form__group">
                                    <label htmlFor="title" className="add-voting-form__label">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="add-voting-form__input"
                                        placeholder="Enter title"
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
                                        placeholder="Enter a description"
                                        rows={3}
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="add-voting-form__group">
                                    <label htmlFor="photo" className="add-voting-form__label">Upload Photo</label>
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        accept="image/*"
                                        onChange={this.handlePhotoChange}
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
                                                placeholder="Enter option title"
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
                                                placeholder="Enter option description"
                                                rows={2}
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
