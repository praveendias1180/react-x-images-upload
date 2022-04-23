import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Typography, Button, ListItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia'

export default class UploadImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: undefined,
            previewImage: undefined,
            progress: 0,
            message: "",
            isError: false,
            imageInfos: [],
        };

        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
    }

    componentDidMount() {
        UploadService.getFiles().then((response) => {
            this.setState({
                imageInfos: response.data,
            });
        });
    }

    render() {
        const {
            currentFile,
            previewImage,
            progress,
            message,
            imageInfos,
            isError
        } = this.state;

        return (
            <div className="rq-upload">
                <label htmlFor="btn-upload">
                    <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange={this.selectFile} />
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span" >
                        Choose Image
                    </Button>
                </label>
                <div className="file-name">
                    {currentFile ? currentFile.name : null}
                </div>
                <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    disabled={!currentFile}
                    onClick={this.upload}>
                    Upload
                </Button>
                {currentFile && (
                    <Box className="my20" display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <LinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                        </Box>
                    </Box>)
                }
                {previewImage && (
                    <CardMedia
                    component="img"
                    height="194"
                    image={previewImage}
                    alt="Paella dish"
                  />
                )}
                {message && (
                    <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                        {message}
                    </Typography>
                )}
                <div>
                <Typography variant="h6" className="list-header">
                    List of Images
                </Typography>
                </div>
                <div>
                <ul className="list-group">
                    {imageInfos &&
                        imageInfos.map((image, index) => (
                            <ListItem
                                divider
                                key={index}>
                                <img src={image.url} alt={image.name} height="80px" className="mr20" />
                                <a href={image.url}>{image.name}</a>
                            </ListItem>
                        ))}
                </ul>
                </div>
            </div >
        );
    }



    selectFile(event) {
        this.setState({
            currentFile: event.target.files[0],
            previewImage: URL.createObjectURL(event.target.files[0]),
            progress: 0,
            message: ""
        });
    }

    upload() {
        this.setState({
            progress: 0
        });
        UploadService.upload(this.state.currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
            .then((response) => {
                this.setState({
                    message: response.data.message,
                    isError: false
                });
                return UploadService.getFiles();
            })
            .then((files) => {
                this.setState({
                    imageInfos: files.data,
                });
            })
            .catch((err) => {
                this.setState({
                    progress: 0,
                    message: "Could not upload the image!",
                    currentFile: undefined,
                    isError: true
                });
            });
    }
}