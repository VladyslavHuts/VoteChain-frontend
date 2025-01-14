import React, { Component, ChangeEvent, FormEvent } from "react";
import "../styles/addVotingForm.css";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
interface Option {
  optionText: string;
  description: string;
}

interface State {
  id: string;
  title: string;
  description: string;
  options: Option[];
  photo: File | null;
  endTime: string; // Замінили startDate на endDate
  contractAddress: string;
}

class AddVotingForm extends Component<{}, State> {
  state: State = {
    id: uuidv4(),
    title: "",
    description: "",
    options: [{ optionText: "", description: "" }],
    photo: null,
    endTime: "",
    contractAddress: ethers.Wallet.createRandom().address,
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

  handleOptionChange = (
    index: number,
    field: "optionText" | "description",
    value: string
  ) => {
    const updatedOptions = [...this.state.options];
    updatedOptions[index][field] = value;
    this.setState({ options: updatedOptions });
  };

  handleAddOption = () => {
    this.setState((prevState) => ({
      options: [...prevState.options, { optionText: "", description: "" }],
    }));
  };

  handleRemoveOption = (index: number) => {
    this.setState((prevState) => {
      const updatedOptions = prevState.options.filter((_, i) => i !== index);
      return {
        options:
          updatedOptions.length >= 1 ? updatedOptions : prevState.options,
      };
    });
  };

  resetForm = () => {
    this.setState({
      id: uuidv4(),
      title: "",
      description: "",
      options: [{ optionText: "", description: "" }],
      photo: null,
      endTime: "",
      contractAddress: ethers.Wallet.createRandom().address,
    });
  };

  handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<State, "endTime">);

    if (name === "endTime") {
      const currentDateTime = new Date().toISOString().slice(0, 16); // Формат YYYY-MM-DDTHH:mm
      if (value < currentDateTime) {
        alert("End time must not be earlier than the current time.");
      }
    }
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, options, photo, endTime, contractAddress } =
      this.state;

    // Перевірка на заповненість полів
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required.");
      return;
    }

    if (options.length < 2) {
      alert("At least 2 options are required.");
      return;
    }

    if (
      options.some((opt) => !opt.optionText.trim() || !opt.description.trim())
    ) {
      alert("All options must have a title and description.");
      return;
    }

    if (!endTime) {
      alert("End time must be provided.");
      return;
    }

    const photoToSend = photo ? photo : "https://cdn-icons-png.flaticon.com/512/8089/8089593.png"; 

    const authToken = localStorage.getItem("authToken"); 
    if (!authToken) {
      console.error("No authToken found in localStorage.");
      return;
    }

    // Формуємо дані для відправки
    const payload = {
      title,
      description,
      options: options.map((option) => ({
        optionText: option.optionText,
        description: option.description,
      })),
      endTime, // Замінили endDate на endTime
      contractAddress,
      imageUrl: photoToSend,
    };

    // Виводимо JSON об'єкт (тіло запиту) у консоль
    console.log("Request payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch("http://localhost:80/votes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Add token to Authorization header
        },
        body: JSON.stringify(payload), // Send data as JSON
      });

      const data = await response.json();
      if (data.success) {
        alert("Voting created successfully!");
        this.resetForm();
        
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating voting:", error);
      alert("An error occurred while creating the voting.");
    }
  };

  render() {
    return (
      <div className="add-voting-form">
        <div className="container">
          <div className="add-voting-form__container">
            <form
              onSubmit={this.handleSubmit}
              className="add-voting-form__form"
            >
              <div className="add-voting-form__section">
                <h2 className="add-voting-form__title">Voting Information</h2>
                <div className="add-voting-form__group">
                  <label htmlFor="title" className="add-voting-form__label">
                    Title
                  </label>
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
                  <label
                    htmlFor="description"
                    className="add-voting-form__label"
                  >
                    Description
                  </label>
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
                  <label htmlFor="photo" className="add-voting-form__label">
                    Upload Photo
                  </label>
                  <label
                    className="add-voting-form__button-upload"
                    htmlFor="photo"
                  >
                    {this.state.photo ? "Photo Selected" : "Choose a File"}
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="add-voting-form__input-file"
                    onChange={this.handlePhotoChange}
                  />
                </div>
                <div className="add-voting-form__group">
                  <label htmlFor="endTime" className="add-voting-form__label">
                    End Time
                  </label>
                  <input
                    type="datetime-local" // Використовуємо type="datetime-local" для введення дати та часу
                    id="endTime"
                    name="endTime"
                    className="add-voting-form__input"
                    value={this.state.endTime} // Перевірте, чи значення передається коректно
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
                      <label className="add-voting-form__label">
                        Option Title
                      </label>
                      <input
                        type="text"
                        className="add-voting-form__input"
                        value={option.optionText}
                        onChange={(e) =>
                          this.handleOptionChange(
                            index,
                            "optionText",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="add-voting-form__group">
                      <label className="add-voting-form__label">
                        Option Description
                      </label>
                      <textarea
                        className="add-voting-form__input"
                        value={option.description}
                        onChange={(e) =>
                          this.handleOptionChange(
                            index,
                            "description",
                            e.target.value
                          )
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
