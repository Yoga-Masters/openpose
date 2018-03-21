# Openpose Command to Run

./path/to/openpose.exe --image_dir ./path_to_image --write_images ./path_to_directory --write_keypoint ./path_to_directory --display 0

## MAIN FLAGS (Important ones to note are **ed)

	--face: Enables face keypoint detection.
	
	--hand: Enables hand keypoint detection.
	
	--video input.mp4: Read video. **

	--camera 3: Read webcam number 3.
	
	--image_dir path_to_images/: Run on a folder with images. **

	--ip_camera http://iris.not.iac.es/axis-cgi/mjpg/video.cgi?resolution=320x240?x.mjpeg: Run on a streamed IP camera. See examples public IP cameras here.
	
	--write_video path.avi: Save processed images as video. **

	--write_images folder_path: Save processed images on a folder. **

	--write_keypoint path/: Output JSON, XML or YML files with the people pose data on a folder. **

	--process_real_time: For video, it might skip frames to display at real time.
	
	--disable_blending: If enabled, it will render the results (keypoint skeletons or heatmaps) on a black background, not showing the original image. Related: part_to_show, alpha_pose, and alpha_pose.
	
	--part_to_s	how: Prediction channel to visualize.	
	
	--display 0	: Display window not opened. Useful for servers and/or to slightly speed up OpenPose. **

	--num_gpu 2 --num_gpu_start 1: Parallelize over this number of GPUs starting by the desired device id. By default it uses all the available GPUs.
	
	--model_pose MPI: Model to use, affects number keypoints, speed and accuracy.
	
	--logging_level 3: Logging messages threshold, range [0,255]: 0 will output any message & 255 will output none. Current messages in the range [1-4], 1 for low priority messages and 4 for important ones.
	

## NOTES:

This assumes you built Openpose with CMAKE already, downloaded the 3rd party dependencies, and imported the models. Haven't tried running this on the CPU version yet. 


## RESOURCES:

- Openpose main page
	- https://github.com/CMU-Perceptual-Computing-Lab/openpose

- Details on how to run Openpose
	- https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/quick_start.md#quick-start

- Installation of portable demo
	- https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/v1.2.1/doc/installation.md#installation---demo

- Installation and building of source code
	- https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/installation.md#installation
