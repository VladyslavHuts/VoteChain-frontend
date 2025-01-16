import React, { Component, ChangeEvent, FormEvent } from "react";
import "../styles/addVotingForm.css";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
import CONTRACT_ABI from "./contractABI.json"; // Replace with your ABI file path

const CONTRACT_ADDRESS = "0xb67b620f52fa7a39e6310b6fd426ce3bb128c2e2";

interface Option {
  optionText: string;
  description: string;
}

interface State {
  id: string;
  title: string;
  description: string;
  options: Option[];
  photo: string;
  endTime: string;
}

class AddVotingForm extends Component<{}, State> {
  state: State = {
    id: uuidv4(),
    title: "",
    description: "",
    options: [{ optionText: "", description: "" }],
    photo: "",
    endTime: "",
  };

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<State, keyof State>);
  };

  handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ photo: value });
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
      photo: "",
      endTime: "",
    });
  };

  handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<State, "endTime">);

    if (name === "endTime") {
      const currentDateTime = new Date().toISOString().slice(0, 16);
      if (value < currentDateTime) {
        alert("End time must not be earlier than the current time.");
      }
    }
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, options, photo, endTime } = this.state;

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

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const optionsTexts = options.map((opt) => opt.optionText);
      const transaction = await contract.createVoting(
        title,
        description,
        optionsTexts,
        Math.floor(new Date(endTime).getTime() / 1000)
      );

      alert("Transaction sent! Please confirm it in MetaMask.");
      const receipt = await transaction.wait();

      if (receipt.status === 1) {
        const payload = {
          title,
          description,
          options,
          endTime,
          contractAddress: receipt.hash,
          imageUrl: photo,
        };

        const authToken = localStorage.getItem("authToken");

        try {
          const response = await fetch("http://localhost:80/votes/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          if (data.success) {
            alert("Voting created successfully!");
            this.resetForm();
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error creating voting in backend:", error);
          alert("An error occurred while creating the voting in backend.");
        }
      } else {
        alert("Transaction failed.");
      }
    } catch (error) {
      console.error("Error interacting with the contract:", error);
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
              <div className="add-voting-form__sections">
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
                      Photo URL
                    </label>
                    <input
                      type="text"
                      id="photo"
                      name="photo"
                      placeholder="Enter photo URL"
                      className="add-voting-form__input"
                      value={this.state.photo || ""}
                      onChange={this.handlePhotoChange}
                    />
                  </div>

                  <div className="add-voting-form__group">
                    <label htmlFor="endTime" className="add-voting-form__label">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      id="endTime"
                      name="endTime"
                      className="add-voting-form__input"
                      value={this.state.endTime}
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
