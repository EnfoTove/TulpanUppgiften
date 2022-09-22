import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton } from 'office-ui-fabric-react';

export interface IFileuploaderProps{

}

export default class Fileuploader extends React.Component<IFileuploaderProps, {}> {
  public render(): React.ReactElement<IFileuploaderProps> {
    return (
      <div>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<PrimaryButton onClick={this.onFileUpload}>
				Upload
				</PrimaryButton>
			</div>
		</div>
    );
  }



	state = {

	// Initially, no file is selected
	selectedFile: null
	};

	// On file select (from the pop up)
	onFileChange = event => {

	// Update the state
	this.setState({ selectedFile: event.target.files[0] });

	};

	// On file upload (click the upload button)
	onFileUpload = () => {

	// Create an object of formData
	const formData = new FormData();

	// Update the formData object
	formData.append(
		"myFile",
		this.state.selectedFile,
		this.state.selectedFile.name
	);

	// Details of the uploaded file
	console.log(this.state.selectedFile);

	// Request made to the backend api
	// Send formData object
	console.log("here is where the post is to be made")
};
}









