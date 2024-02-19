
# Hybrid Recommender System

## Introduction
This repository contains code for a hybrid recommender system implemented in Python using pandas and scikit-learn. The system combines content-based and collaborative filtering techniques to generate product recommendations for customers.

## Table of Contents
1. [Data Generation](#data-generation)
2. [Data Preprocessing and Segmentation](#data-preprocessing-and-segmentation)
3. [Customer Data Preparation for Sellers](#customer-data-preparation-for-sellers)
4. [Customer-Product Interaction Analysis](#customer-product-interaction-analysis)
5. [Segment Analysis](#segment-analysis)
6. [Content-Based Filtering](#content-based-filtering)
7. [Collaborative Filtering](#collaborative-filtering)
8. [Hybrid Recommendation](#hybrid-recommendation)
9. [Evaluation](#evaluation)

---

## 1. Data Generation <a name="data-generation"></a>
- **Description:** 
  - Realistic synthetic customer and product data are generated.
- **Code Files:** 
  - [data_generation.py](#)
- **Steps:**
  1. Define real product data.
  2. Implement functions to mask sensitive data and generate synthetic customer data.
  3. Generate synthetic product data and save it to CSV files.

```python
import pandas as pd
import numpy as np
import hashlib
import os
import base64
import random

# Define real product data
real_product_data = {
    'product_name': ['iPhone 13', 'Samsung Galaxy S21', 'MacBook Pro', 'Lenovo ThinkPad', 'Nike Air Max', 'Adidas Ultraboost', 'Harry Potter and the Sorcerer\'s Stone', 'To Kill a Mockingbird', 'Amazon Echo Dot', 'Google Nest Mini'],
    'category': ['Electronics', 'Electronics', 'Electronics', 'Electronics', 'Clothing', 'Clothing', 'Books', 'Books', 'Electronics', 'Electronics'],
    'features': [['5G', 'A15 Bionic chip'], ['5G', 'Exynos 2100'], ['M1 chip', 'Retina display'], ['Intel Core processor', 'Windows 10'], ['Air Max cushioning', 'Mesh upper'], ['Boost cushioning', 'Primeknit upper'], ['Fantasy fiction', 'Wizardry'], ['Classic literature', 'Southern Gothic'], ['Voice control', 'Smart home integration'], ['Voice control', 'Smart home integration']],
    'brand': ['Apple', 'Samsung', 'Apple', 'Lenovo', 'Nike', 'Adidas', 'J.K. Rowling', 'Harper Lee', 'Amazon', 'Google'],
    'keywords': [['iPhone', 'Apple', 'Smartphone'], ['Samsung', 'Galaxy', 'Android'], ['MacBook', 'Apple', 'Laptop'], ['ThinkPad', 'Lenovo', 'Laptop'], ['Air Max', 'Nike', 'Sneakers'], ['Ultraboost', 'Adidas', 'Sneakers'], ['Harry Potter', 'Fantasy', 'Novel'], ['To Kill a Mockingbird', 'Classic', 'Novel'], ['Echo Dot', 'Amazon', 'Smart speaker'], ['Nest Mini', 'Google', 'Smart speaker']]
}

# Function to mask sensitive data (e.g., email, phone)
def mask_data(data):
    masked_data = ""
    for char in data:
        if char.isdigit():
            masked_data += "*"
        else:
            masked_data += char
    return masked_data

# Function to encrypt sensitive data using XOR encryption and Base64 encoding
def encrypt_data(data):
    encryption_key = 0xAB  # Example encryption key (for demonstration purposes only)
    data_bytes = data.encode('utf-8')
    encrypted_bytes = bytes([byte ^ encryption_key for byte in data_bytes])
    encrypted_data = base64.b64encode(encrypted_bytes).decode('utf-8')
    return encrypted_data

# Function to anonymize customer IDs using hashing
def anonymize_customer_id(customer_id):
    return hashlib.sha256(customer_id.encode()).hexdigest()

# Function to generate synthetic customer data
def generate_customer_data(num_customers, buyer_np_id):
    customer_data = {
        'customer_id': [anonymize_customer_id(f'Cust{i:04d}') for i in range(1, num_customers + 1)],
        'age': np.random.randint(18, 65, num_customers),
        'gender': np.random.choice(['Male', 'Female'], num_customers),
        'location': [encrypt_data(location) for location in np.random.choice(['City', 'Suburb', 'Rural'], num_customers)],
        'purchase_history': [np.random.choice(real_product_data['product_name'], size=np.random.randint(1, 4)).tolist() for _ in range(num_customers)],
        'browsing_history': [np.random.choice(real_product_data['product_name'], size=np.random.randint(1, 4)).tolist() for _ in range(num_customers)],
        'preferences': [np.random.choice(real_product_data['product_name'], size=np.random.randint(1, 4)).tolist() for _ in range(num_customers)]
    }
    df = pd.DataFrame(customer_data)
    df['buyer_np_id'] = buyer_np_id  # Assign Buyer NP ID to customers
    return df

def generate_product_data(num_products, num_sellers):
    product_data = {
        'product_id': [f'P{i:04d}' for i in range(1, num_products + 1)],
        'product_name': real_product_data['product_name'],
        'category': real_product_data['category'],
        'features': real_product_data['features'],
        'brand': real_product_data['brand'],
        'keywords': real_product_data['keywords'],
        'seller_id': [f'Seller{random.randint(1, num_sellers):03d}' for _ in range(num_products)]  # Assign random seller IDs
    }
    return pd.DataFrame(product_data)


# Generate synthetic product data with 10 products and 5 sellers
num_products = 10
num_sellers = 5
product_data = generate_product_data(num_products, num_sellers)

# Specify directory for saving files
output_directory = "C:\\Users\\NIGAM SHARMA\\Desktop\\fun"


# Create the directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Generate synthetic customer data for each Buyer NP
num_customers_per_np = 10
num_buyer_nps = 3
customer_dfs = [generate_customer_data(num_customers_per_np, buyer_np_id) for buyer_np_id in range(1, num_buyer_nps + 1)]

# Concatenate customer dataframes
customer_data = pd.concat(customer_dfs)

# Write customer data to CSV file
customer_file_name = os.path.join(output_directory, 'customer_data.csv')
customer_data.to_csv(customer_file_name, index=False)

# Write product data to CSV file
product_file_name = os.path.join(output_directory, 'product_data.csv')
product_data.to_csv(product_file_name, index=False)

print("Data saved to CSV files.")
```

## 2. Data Preprocessing and Segmentation <a name="data-preprocessing-and-segmentation"></a>
- **Description:** 
  -

 Customer data is preprocessed, and customers are segmented.
- **Code Files:** 
  - [data_preprocessing_segmentation.py](#)
- **Steps:**
  1. Load customer data from CSV files.
  2. Preprocess customer data and segment customers using K-means clustering.
  3. Save segmented customer data to a CSV file.

```python
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Load customer data from CSV file
customer_file_name = 'customer_data.csv'
customer_data = pd.read_csv(customer_file_name)

# Preprocess customer data
X = customer_data[['age']]
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Perform PCA for dimensionality reduction
pca = PCA(n_components=1)
X_pca = pca.fit_transform(X_scaled)

# Cluster customers using K-means
kmeans = KMeans(n_clusters=3, random_state=42)
customer_data['segment'] = kmeans.fit_predict(X_pca)

# Visualize clusters
plt.scatter(X_pca[:, 0], customer_data['age'], c=customer_data['segment'], cmap='viridis')
plt.xlabel('PCA Component')
plt.ylabel('Age')
plt.title('Customer Segmentation')
plt.colorbar(label='Segment')
plt.show()

# Save segmented customer data to a CSV file
segmented_customer_file_name = 'segmented_customer_data.csv'
customer_data.to_csv(segmented_customer_file_name, index=False)

print("Segmented customer data saved to CSV file.")
```

## 3. Customer Data Preparation for Sellers <a name="customer-data-preparation-for-sellers"></a>
- **Description:** 
  - Customer data is prepared for sharing with sellers.
- **Code Files:** 
  - [customer_data_preparation.py](#)
- **Steps:**
  1. Load customer data from CSV files.
  2. Prepare customer data for sharing with sellers.
  3. Save prepared customer data to a CSV file for sellers.

```python
import pandas as pd
import os

# Function to prepare customer data for sharing with sellers
def prepare_customer_data_for_sellers(customer_data):
    # Select relevant columns for sharing
    customer_data_for_sellers = customer_data[['customer_id', 'purchase_history', 'browsing_history', 'preferences']]
    
    return customer_data_for_sellers

# Specify the full path to the CSV file
csv_file_path = "C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\customer_data.csv"

# Load customer data from CSV file
customer_data = pd.read_csv(csv_file_path)

# Prepare customer data for sharing with sellers
customer_data_for_sellers = prepare_customer_data_for_sellers(customer_data)

# Specify directory for saving files
output_directory = "C:\\Users\\NIGAM SHARMA\\Desktop\\fun"

# Create the directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Write customer data to CSV file for sellers
file_name = os.path.join(output_directory, 'customer_data_for_sellers.csv')
customer_data_for_sellers.to_csv(file_name, index=False)

print("Customer data prepared for sellers and saved successfully.")

```

## 4. Customer-Product Interaction Analysis <a name="customer-product-interaction-analysis"></a>
- **Description:** 
  - Customer-product interactions are analyzed.
- **Code Files:** 
  - [customer_product_interaction_analysis.py](#)
- **Steps:**
  1. Load customer data, segment data, and product data from CSV files.
  2. Preprocess customer, segment, and product data.
  3. Analyze customer-product interactions and segment counts.

```python
import pandas as pd

# Load customer data
customer_data = pd.read_csv('C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\customer_data.csv')


# Load segment data
segment_data = pd.read_csv('C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\segmented_customer_data.csv')

# Load product data
product_data = pd.read_csv('C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\product_data.csv')

# Preprocessing customer data
def preprocess_customer_data(customer_data):
    # Convert categorical variables to numerical values if needed
    customer_data['gender'] = pd.Categorical(customer_data['gender']).codes
    return customer_data


# preprocess segment data
from sklearn.preprocessing import OneHotEncoder

from sklearn.preprocessing import OneHotEncoder

def preprocess_segment_data(segment_data):
    
    return segment_data


# Preprocessing product data
def preprocess_product_data(product_data):
    # Convert categorical variables to numerical values if needed
    return product_data

# Apply preprocessing to each dataset
customer_data = preprocess_customer_data(customer_data)
segment_data = preprocess_segment_data(segment_data)
product_data = preprocess_product_data(product_data)


def analyze_customer_product_interactions(customer_data):
    # Extracting relevant columns for analysis
    interactions_data = customer_data[['customer_id', 'purchase_history', 'browsing_history', 'preferences']]
   
    # Convert string representations of lists to actual lists
    interactions_data['purchase_history'] = interactions_data['purchase_history'].apply(eval)
    interactions_data['browsing_history'] = interactions_data['browsing_history'].apply(eval)
    interactions_data['preferences'] = interactions_data['preferences'].apply(eval)
    
    # Perform further analysis or feature engineering as needed
    
    return interactions_data

import pandas as pd

# Assuming you have customer_data DataFrame with customer_id and purchase_history columns
# Assuming you have product_data DataFrame with product_id column

# Create an empty list to store interaction data
interactions_data = []

# Iterate over each row in the customer_data DataFrame
for index, row in customer_data.iterrows():
    # Extract customer_id and purchase_history
    customer_id = row['customer_id']
    purchase_history = row['purchase_history']
    
    # Convert purchase_history to a list if it's a string
    if isinstance(purchase_history, str):
        purchase_history = eval(purchase_history)
    
    # Iterate over each product in the purchase_history list
    for product_id in purchase_history:
        # Append a tuple (customer_id, product_id) to interactions_data
        interactions_data.append((customer_id, product_id))

# Create a DataFrame from interactions_data with columns customer_id and product_id
interactions_data = pd.DataFrame(interactions_data, columns=['customer_id', 'product_id'])

```
## 5. Segment Analysis <a name="segment-analysis"></a>
- **Description:** 
  - Segments of customers are analyzed.
- **Code Files:** 
  - [segment_analysis.py](#)
- **Steps:**
  1. Load segment data from CSV files.
  2. Preprocess segment data.
  3. Analyze segments and count the number of customers in each segment.

```python
import pandas as pd

# Load segment data
segment_data = pd.read_csv('C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\segmented_customer_data.csv')

# Preprocessing segment data
def preprocess_segment_data(segment_data):
    # No preprocessing needed for segment data
    return segment_data

# Apply preprocessing to segment data
segment_data = preprocess_segment_data(segment_data)

def analyze_segments(segment_data):
    # Count the number of customers in each segment
    segment_counts = segment_data['segment'].value_counts().reset_index()
    segment_counts.columns = ['segment', 'customer_count']
    
    return segment_counts

# Analyze segments
segment_counts = analyze_segments(segment_data)
print(segment_counts)

```

## 6. Content-Based Filtering <a name="content-based-filtering"></a>
- **Description:** 
  - Content-based filtering is implemented to recommend products based on their attributes.
- **Code Files:** 
  - [content_based_filtering.py](#)
- **Steps:**
  1. Implement functions to extract features from product names and calculate similarity scores.
  2. Implement content-based filtering algorithm.
  3. Recommend products based on customer ID and product name.

```python
import pandas as pd
import ast

# Load customer data and product data
customer_data = pd.read_csv('C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\customer_data.csv')
product_data = pd.read_csv('C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\product_data.csv')

# Define functions for content-based filtering
def extract_features_from_product_name(product_name):
    return product_name.lower().split()

def extract_features_from_product_row(product_row):
    keywords = product_row['keywords']
    return keywords.lower().split()

def calculate_similarity(features1, features2):
    features1_set = set(features1)
    features2_set = set(features2)
    intersection = features1_set.intersection(features2_set)
    union = features1_set.union(features2_set)
    similarity_score = len(intersection) / len(union)
    return similarity_score

def content_based_filtering(customer_id, product_name, customer_data, product_data):
    # Retrieve the products the customer has interacted with based on their purchase history
    customer_interactions = customer_data.loc[customer_data['customer_id'] == customer_id, 'purchase_history'].iloc[0]

    # Convert the purchase history to a list if it's a string
    if isinstance(customer_interactions, str):
        customer_interactions = ast.literal_eval(customer_interactions)

    # Extract the attributes of the products the customer has interacted with
    customer_product_attributes = product_data[product_data['product_name'].isin(customer_interactions)][['product_name', 'category', 'features', 'brand', 'keywords']]

    # Use a simple example of recommending products from the same category
    recommended_products = []

    if not customer_product_attributes.empty:
        category = customer_product_attributes.iloc[0]['category']
        recommended_products.extend(product_data[product_data['category'] == category]['product_name'].tolist())

    # Append product name-based recommendations
    if product_name:
        product_attributes = product_data[product_data['product_name'] == product_name][['product_name', 'category', 'features', 'brand', 'keywords']]
        if not product_attributes.empty:
            category = product_attributes.iloc[0]['category']
            # Update feature extraction for product name
            product_name_features = extract_features_from_product_name(product_name)
            # Iterate through product data and calculate similarity with product name features
            for index, row in product_data.iterrows():
                row_features = extract_features_from_product_row(row)
                similarity_score = calculate_similarity(product_name_features, row_features)
                if similarity_score > 0:
                    recommended_products.append(row['product_name'])

    return recommended_products

# Example usage
customer_id = 'Cust0001'
product_name = 'iPhone 13'
recommended_products = content_based_filtering(customer_id, product_name, customer_data, product_data)
print("Content-Based Recommendations:", recommended_products)

```

## 7. Collaborative Filtering <a name="collaborative-filtering"></a>
- **Description:** 
  - Collaborative filtering is implemented to recommend products based on user-item interactions.
- **Code Files:** 
  - [collaborative_filtering.py](#)
- **Steps:**
  1. Implement functions to find similar customers and perform collaborative filtering.
  2. Recommend products based on customer ID, product ID, and the number of recommendations.

```python
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Load interactions data
interactions_data = pd.read_csv('C:\\Users\\NIGAM SHARMA\\Desktop\\fun\\interactions_data.csv')

# Define functions for collaborative filtering
def find_similar_customers(interactions_data, customer_id):
    # Extract interaction data for the given customer
    customer_interactions = interactions_data[interactions_data['customer_id'] == customer_id].drop_duplicates(subset=['product_id'])

    # Extract interaction data for all customers
    all_interactions = interactions_data.drop_duplicates(subset=['customer_id', 'product_id'])

    # Calculate interaction count for each customer-product pair
    interaction_counts = all_interactions.groupby(['customer_id', 'product_id']).size().reset_index(name='interaction_count')

    # Merge data to have customer-product interaction matrix
    interaction_matrix = pd.pivot_table(interaction_counts, values='interaction_count', index='customer_id', columns='product_id', fill_value=0)

    # Extract interactions of similar customers
    similar_customers = cosine_similarity(interaction_matrix.loc[[customer_id]], interaction_matrix)[0]
    similar_customers_indices = np.argsort(similar_customers)[::-1][1:]  # Exclude the customer itself

    # Return top similar customers
    return interaction_matrix.index[similar_customers_indices]

def collaborative_filtering(interactions_data, customer_id, num_recommendations=5):
    # Filter interactions data for the given customer
    customer_interactions = interactions_data[interactions_data['customer_id'] == customer_id]
    
    # Find similar customers based on interactions
    similar_customers = find_similar_customers(interactions_data, customer_id)
    
    # Aggregate interactions of similar customers
    similar_customer_interactions = interactions_data[interactions_data['customer_id'].isin(similar_customers)]
    aggregated_interactions = similar_customer_interactions.groupby('product_id').size().reset_index(name='interaction_count')
    
    # Recommend top N products
    recommended_products = aggregated_interactions.sort_values(by='interaction_count', ascending=False).head(num_recommendations)['product_id'].tolist()
    
    return recommended_products

# Example usage
customer_id = 'Cust0001'
recommended_products = collaborative_filtering(interactions_data, customer_id)
print("Collaborative Filtering Recommendations:", recommended_products)

```

## 8. Hybrid Recommendation <a name="hybrid-recommendation"></a>
- **Description:** 
  - Hybrid recommendation system combines content-based and collaborative filtering approaches.
- **Code Files:** 
  - [hybrid_recommendation.py](#)
- **Steps:**
  1. Implement hybrid recommendation function.
  2. Combine recommendations from content-based and collaborative filtering.

```python
# Example usage
content_based_recommendations = ['iPhone 13', 'MacBook Pro']
collaborative_recommendations = ['Samsung Galaxy S21', 'Lenovo ThinkPad']

def hybrid_recommendation(content_based_recommendations, collaborative_recommendations):
    # Combine recommendations from both approaches
    hybrid_recommendations = list(set(content_based_recommendations + collaborative_recommendations))
    return hybrid_recommendations

hybrid_recommendations = hybrid_recommendation(content_based_recommendations, collaborative_recommendations)
print("Hybrid Recommendations:", hybrid_recommendations)

```

## 9. Evaluation <a name="evaluation"></a>
- **Description:** 
  - Evaluation metrics are calculated to assess the effectiveness of recommendations.
- **Code Files:** 
  - [evaluation.py](#)
- **Steps:**
  1. Implement functions to evaluate recommendations.
  2. Calculate conversion rate and average products purchased per user.

```python
def evaluate_recommendations(initial_purchase_history, recommended_products):
    # Conversion Rate
    initial_purchase_count = len(initial_purchase_history)
    recommended_purchase_count = len(recommended_products)
    conversion_rate = recommended_purchase_count / initial_purchase_count * 100
    
    # Average Number of Products Purchased per User
    avg_products_purchased_per_user = recommended_purchase_count  # Assuming each recommended product is purchased once
    
    # Print or log the metrics
    print("Conversion Rate:", conversion_rate)
    print("Average Products Purchased per User:", avg_products_purchased_per_user)

    # Return the metrics
    return conversion_rate, avg_products_purchased_per_user

# Usage
initial_purchase_history = customer_data.loc[customer_data['customer_id'] == customer_id, 'purchase_history'].iloc[0]

# Make Hybrid Recommendations
hybrid_recommendations = content_based_filtering(customer_id, product_name, customer_data, product_data)

# Evaluate the recommendations
conversion_rate, avg_products_purchased_per_user = evaluate_recommendations(initial_purchase_history, hybrid_recommendations)

```