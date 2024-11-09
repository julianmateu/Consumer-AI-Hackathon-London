// pages/IncidentReport.jsx
import React from "react";
import Header from "./Header";
import Typography from "./Typography";
import Icon from "./Icon";
import Input from "./Input";
import UploadCard from "./UploadCard";
import ImagePreview from "./ImagePreview";
import Button from "./Button";

const IncidentReport = () => {
  return (
    <Header>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h1">Report Your Incident</Typography>
        <Typography variant="body1" className="mt-4">
          Let's begin with your vehicle details and photos.
        </Typography>

        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Typography variant="h2">Vehicle Registration Number:</Typography>
            <Icon type="info" />
          </div>
          <Input className="mt-4" />
        </div>

        <div className="mt-8">
          <UploadCard>
            <div className="p-6">
              <div className="flex items-center gap-2">
                <Icon type="upload" />
                <div>
                  <Typography variant="body1">
                    Upload Photos of the Incident (optional)
                  </Typography>
                  <Typography variant="caption">
                    Upload up to 5 images, JPG or PNG only
                  </Typography>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <ImagePreview />
                <Button variant="delete">x</Button>
              </div>
            </div>
          </UploadCard>
        </div>

        <div className="mt-8 flex justify-center">
          <Button>Next</Button>
        </div>
      </div>
    </Header>
  );
};

export default IncidentReport;
